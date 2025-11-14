from rest_framework import serializers 
from .models import Match, MenPlayer, WomenPlayer, JuniorPlayer,  Candidate, State, Country, Contact
from datetime import date
from django.contrib.auth.models import User 
from datetime import date 
from .models import ShopItem, Order, OrderItem, Review, News, Comment, Team
from django.db import transaction


# ==========================================
#             TEAM SERIALIZER
# ==========================================
class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'team_type', 'city', 'country', 'is_kpfa_team', 'logo']



# ==========================================
#            MATCH SERIALIZER
# ==========================================
class MatchSerializer(serializers.ModelSerializer):
    # For nested team details in MatchDetail.vue
    home_team = TeamSerializer(read_only=True)
    away_team = TeamSerializer(read_only=True)
    home_team_id = serializers.PrimaryKeyRelatedField(
        queryset=Team.objects.all(), source="home_team", write_only=True
    )
    away_team_id = serializers.PrimaryKeyRelatedField(
        queryset=Team.objects.all(), source="away_team", write_only=True
    )

    class Meta:
        model = Match
        fields = [
            "id",
            "home_team",
            "away_team",
            "home_team_id",
            "away_team_id",
            "match_date",
            "match_time",
            "location",
            "competition_type",
            "home_score",
            "away_score",
            "is_completed",
            "banner",
            "result",
        ]
        read_only_fields = ["result"]


class MenPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenPlayer
        fields =  fields = '__all__'

    def get_age(self, obj):
        today = date.today()
        age = today.year - obj.date_of_birth.year - ((today.month, today.day) < (obj.date_of_birth.month, obj.date_of_birth.day))
        return age




class WomenPlayerSerializer(serializers.ModelSerializer):
    calculated_age = serializers.SerializerMethodField()

    class Meta:
        model = WomenPlayer
        fields =  fields = '__all__'

    def get_calculated_age(self, obj):
        if not obj.date_of_birth:
            return None
        today = date.today()
        age = today.year - obj.date_of_birth.year - (
            (today.month, today.day) < (obj.date_of_birth.month, obj.date_of_birth.day)
        )
        return age


class JuniorPlayerSerializer(serializers.ModelSerializer):
    calculated_age = serializers.SerializerMethodField()

    class Meta:
        model = JuniorPlayer
        fields =  fields = '__all__'

    def get_calculated_age(self, obj):
        if not obj.date_of_birth:
            return None
        today = date.today()
        age = today.year - obj.date_of_birth.year - (
            (today.month, today.day) < (obj.date_of_birth.month, obj.date_of_birth.day)
        )
        return age


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ["id", "code", "name"]


class StateSerializer(serializers.ModelSerializer):
    country = CountrySerializer(read_only=True)

    class Meta:
        model = State
        fields = ["id", "code", "name", "country"]


class CandidateSerializer(serializers.ModelSerializer):
    # show full team object, not just the ID
    team = TeamSerializer(read_only=True)
    team_id = serializers.PrimaryKeyRelatedField(
        queryset=Team.objects.filter(team_type='KPFA'),
        write_only=True,
        source='team'
    )
    country = CountrySerializer(read_only=True)
    state_of_origin = StateSerializer(read_only=True)

    country_id = serializers.PrimaryKeyRelatedField(
        queryset=Country.objects.all(), source="country", write_only=True
    )
    state_id = serializers.PrimaryKeyRelatedField(
        queryset=State.objects.all(), source="state_of_origin", write_only=True
    )
    team_name = serializers.CharField(source="team.name", read_only=True)


    def validate_date_of_birth(self, value):
        today = date.today()
        age = today.year - value.year - ((today.month, today.day) < (value.month, value.day))

        if age < 5:
            raise serializers.ValidationError("Candidate must be at least 5 years old.")
        if age > 21:
            raise serializers.ValidationError("Candidate cannot be older than 21 years.")
        return value



    class Meta:
        model = Candidate
        model = Candidate  # or MenPlayer if that's the registration table
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'



class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # show username
    replies = serializers.SerializerMethodField()
    like_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "user",
            "text",
            "created_at",
            "parent",
            "replies",
            "like_count",
        ]

    def get_replies(self, obj):
        # Only fetch direct replies (avoid infinite recursion)
        replies_qs = obj.replies.all().order_by("created_at")
        return CommentSerializer(replies_qs, many=True, context=self.context).data



class NewsSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = News
        fields = ["id", "title", "content", "created_at", "comments"]



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True},
                        "email": {"required": True}
                        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"]
        )
        return user


class ShopItemSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    class Meta:
        model = ShopItem
        fields = ['id','name','description','price','category','stock_quantity','image','images', 'date_added']
        read_only_fields = ['id', 'date_added']

    def get_images(self,obj):
        # if you implement a separate model for multiple images, return them here
        return []

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'product', 'user', 'user_name', 'rating', 'text', 'created_at']
        read_only_fields = ['id', 'user', 'user_name', 'created_at']

    def get_user_name(self, obj):
        return obj.user.username if obj.user else 'Guest'

    def validate_rating(self, value):
        if not (1 <= value <= 5):
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value

    def create(self, validated_data):
        # sanitize text length and content if necessary
        if 'text' in validated_data and len(validated_data['text']) > 2000:
            validated_data['text'] = validated_data['text'][:2000]
        user = self.context['request'].user if self.context['request'].user.is_authenticated else None
        validated_data['user'] = user
        return super().create(validated_data)



class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'item', 'quantity', 'price']
        read_only_fields = ['price']




class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    payment_method = serializers.ChoiceField(choices=Order.PAYMENT_METHOD_CHOICES)
    payment_proof = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = Order
        fields = ['id', 'user','items', 'payment_method', 'payment_proof', 'created_at']
        read_only_fields = ['user', 'id', 'created_at']  #  ensures DRF doesn’t expect user in POST

    def validate_payment_method(self, value):
        valid_methods = [choice[0] for choice in Order.PAYMENT_METHOD_CHOICES]
        if value not in valid_methods:
            raise serializers.ValidationError(f"{value} is not a valid payment method.")
        return value

    def validate_items(self, items):
        if not items:
            raise serializers.ValidationError("You must include at least one item.")
        for item in items:
            product = item['item']
            if item['quantity'] > product.stock:
                raise serializers.ValidationError(
                    f"Not enough stock for {product.name}. Available: {product.stock}"
                )
        return items

    @transaction.atomic
    def create(self, validated_data):
        # ✅ Automatically set user from request
        request = self.context.get("request")
        user = self.context['request'].user  # ✅ pull user from request

        items_data = validated_data.pop('items')
        order = Order.objects.create(user=user, **validated_data)

        # Create OrderItems and update stock
        for item_data in items_data:
            product = item_data['item']
            quantity = item_data['quantity']

            if product.stock < quantity:
                raise serializers.ValidationError(
                    f"Insufficient stock for {product.name}"
                )

            OrderItem.objects.create(order=order, item=product, quantity=quantity)
            product.stock -= quantity
            product.save()

        return order



class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'phone', 'email', 'shipping_address',
            'is_paid', 'status', 'total_amount', 'created_at',
            'payment_method', 'payment_proof', 'order_items'
        ]

    def get_order_items(self, obj):
        return [
            {
                'item_id': oi.item.id,
                'item_name': oi.item.name,
                'quantity': oi.quantity,
                'unit_price': oi.unit_price,
                'subtotal': oi.subtotal,
            }
            for oi in obj.order_items.all()
        ]
