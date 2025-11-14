from django.shortcuts import render
from django.conf import settings 
from rest_framework import viewsets, generics, status, permissions, mixins 
from .models import MenPlayer, WomenPlayer, JuniorPlayer,  Candidate, Country, State, Match,  Contact
from .models import ShopItem, Review, Order, News, Comment, Team
from .serializers import NewsSerializer, UserSerializer, CommentSerializer
from .serializers import MatchSerializer, MenPlayerSerializer, WomenPlayerSerializer, JuniorPlayerSerializer, CandidateSerializer, CountrySerializer, StateSerializer, ContactSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from django.contrib.auth import authenticate
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django.contrib.auth.models import User 
from django.shortcuts import get_object_or_404                                  
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.views import APIView
import  requests
from django.core.mail import send_mail
from .serializers import  ShopItemSerializer, OrderCreateSerializer, OrderSerializer, ReviewSerializer, TeamSerializer
#from deep_translator import GoogleTranslator
from rest_framework import permissions
from rest_framework import status
from kpfa.utils import send_order_receipt_email
#from .translation_service import translate_text




# ==========================================
#            TEAM VIEWSETS
# ==========================================
class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by("name")
    serializer_class = TeamSerializer


#  Special endpoint for KPFA teams only (for JoinUsNow.vue)
class KPFA_TeamListView(generics.ListAPIView):
    serializer_class = TeamSerializer

    def get_queryset(self):
        return Team.objects.filter(is_kpfa_team=True).order_by("name")



# ==========================================
#           MATCH VIEWSETS
# ==========================================
class MatchViewSet(viewsets.ModelViewSet):
    #queryset = Match.objects.select_related("home_team", "away_team").order_by("-match_date")
    queryset = Match.objects.all().order_by("-match_date", "-match_time")
    serializer_class = MatchSerializer


# Define throttle scopes in settings (we'll reference them here)
class BurstAnonThrottle(AnonRateThrottle):
    scope = 'anon_burst'

class BurstUserThrottle(UserRateThrottle):
    scope = 'user_burst'



class ShopItemViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public product listing; use filters & search for discoverability (SEO/UX).
    
    """
    queryset = ShopItem.objects.all().order_by("-date_added")
    #queryset = ShopItem.objects.filter()
    serializer_class = ShopItemSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['name', 'description', 'category']
    
    throttle_classes = [BurstAnonThrottle, BurstUserThrottle]

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]
    throttle_classes = [BurstAnonThrottle, BurstUserThrottle]

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(user=user)

class OrderViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    """
    Create orders (checkout) and allow users to view their own orders.
    Only authenticated users can create or view orders.
    """
    queryset = Order.objects.all().order_by('-created_at')
    permission_classes = [IsAuthenticated]
    throttle_classes = [BurstAnonThrottle, BurstUserThrottle]

    def get_serializer_class(self):
        if self.action == 'create':
            return OrderCreateSerializer
        return OrderSerializer

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(user=user).order_by('-created_at')

    def create(self, request, *args, **kwargs):
        print("🚦 CREATE() reached in OrderViewSet")
        print("📬 RAW PAYLOAD TYPE:", type(request.data))
        print("📬 RAW PAYLOAD CONTENT:", request.data)

        # If order_items key exists, show its structure
        if 'order_items' in request.data:
            print("🧾 ORDER_ITEMS STRUCTURE TYPE:", type(request.data['order_items']))
            print("🧾 ORDER_ITEMS CONTENT:", request.data['order_items'])
        else:
            print("⚠️ order_items key missing in payload")

       

        # Continue with normal creation flow
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        order = serializer.save()
        send_order_receipt_email(order)

        




class MenPlayerViewSet(viewsets.ModelViewSet):
    queryset = MenPlayer.objects.all().order_by("-id")
    serializer_class = MenPlayerSerializer



class WomenPlayerViewSet(viewsets.ModelViewSet):
    queryset = WomenPlayer.objects.all().order_by("-id")
    serializer_class = WomenPlayerSerializer


class JuniorPlayerViewSet(viewsets.ModelViewSet):
    queryset = JuniorPlayer.objects.all().order_by("-id")
    serializer_class = JuniorPlayerSerializer


# Language Translation API View 
#class TranslateView(APIView):
    #def post(self, request):
        ####return Response(
                #{"error": "Both 'text' and 'target_lang' are required"},
                #status=status.HTTP_400_BAD_REQUEST
            #)

        #try:
            #translated_text = GoogleTranslator(source="auto", target=target_lang).translate(text)
            #return Response({"translated_text": translated_text}, status=status.HTTP_200_OK)
        #except Exception as e:
           # return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer


class CountryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Country.objects.all().order_by("name")  # alphabetical
    serializer_class = CountrySerializer
    pagination_class = None  # disables pagination

class StateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = State.objects.all()
    serializer_class = StateSerializer
    pagination_class = None  # disables pagination

    def get_queryset(self):
        country_id = self.request.query_params.get("country")
        if country_id:
            return State.objects.filter(country_id=country_id)
        return super().get_queryset()


class ContactCreateView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def perform_create(self, serializer):
        contact = serializer.save()

        # Temporarily disable email sending while testing
      
        print(f"New message from {contact.name} <{contact.email}>: {contact.message}")






class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all().order_by("-published_date")  # or your date field
    #queryset = News.objects.all().order_by("-created_at")
    serializer_class = NewsSerializer


    #@action(detail=False, methods=['get'])
   # def translated(self, request):
        # Prevent recursive translation when translate API calls itself
        #if request.path.startswith("/api/translate/"):
           # return Response({"error": "Nested translation prevented"}, status=400)
        
        #target_lang = request.query_params.get('lang', 'en')
        #news_items = self.get_queryset()
        #serializer = self.get_serializer(news_items, many=True)
        #translated_data = []

        #for item in serializer.data:
            # Translate title and content dynamically using the provided translation helper.
            #title = item.get('title', '') or ''
            #content = item.get('content', '') or ''

            #try:
                #translated_title = translate_text(title, target_lang) if title else title
            #except Exception:
                #translated_title = title

            #try:
                #translated_content = translate_text(content, target_lang) if content else content
            #except Exception:
                #translated_content = content

            #translated_item = item.copy()
            #translated_item['title'] = translated_title
            #translated_item['content'] = translated_content
           # translated_data.append(translated_item)

        #return Response(translated_data)

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        news_id = self.kwargs["news_id"]
        return Comment.objects.filter(news_id=news_id, parent__isnull=True).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, news_id=self.kwargs["news_id"])
    
    def post(self, request, news_id, *args, **kwargs):
        print("User:", request.user)
        print("Is authenticated:", request.user.is_authenticated)
        print("Authorization header:", request.META.get('HTTP_AUTHORIZATION'))
        return super().post(request, news_id, *args, **kwargs)


class ReplyCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    #permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        parent_id = self.kwargs["comment_id"]
        parent_comment = get_object_or_404(Comment, id=parent_id)
        serializer.save(
            user=self.request.user,
            news=parent_comment.news,
            parent=parent_comment
        )


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def toggle_like(request, comment_id):
    comment = get_object_or_404(Comment, id=comment_id)
    if request.user in comment.likes.all():
        comment.likes.remove(request.user)
        return Response({"message": "Unliked", "like_count": comment.like_count})
    else:
        comment.likes.add(request.user)
        return Response({"message": "Liked", "like_count": comment.like_count})
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(username=response.data["username"])
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "message": "Registration Succesful!", 
            "username": user.username, 
            "email": user.email, 
            }, status=status.HTTP_201_CREATED)

class LoginView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                            "token": token.key, 
                             "user_id": user.id, 
                             "username": user.username, 
                             "message": "Login Successful!"
                             }, status=status.HTTP_200_OK)
        return Response({
            "error": "Invalid credentials"
            }, status=status.HTTP_400_BAD_REQUEST)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = ReviewViewSet.objects.all().order_by("-created_at")
    serializer_class = ReviewSerializer
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get_queryset(self):
        product_id = self.kwargs.get('product_pk') or self.request.query_params.get('product')
        qs = Review.objects.all()
        if product_id:
            qs = qs.filter(product_id=product_id)
        return qs
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



#class CoachViewSet(viewsets.ModelViewSet):
    #queryset = Coach.objects.all()
    #serializer_class = CoachSerializer
