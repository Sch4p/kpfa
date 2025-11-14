from django.contrib import admin 
from .models import News, Comment
from .models import  ShopItem, Order, OrderItem, Review, Team, MenPlayer, WomenPlayer, JuniorPlayer, Match, Team, Country, State, Candidate, Contact






# ==========================================
#           TEAM ADMIN
# ==========================================
@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("name", "team_type", "is_kpfa_team", "coach_name")
    list_filter = ("team_type", "is_kpfa_team")
    search_fields = ("name", "coach_name")


# ==========================================
#           MATCH ADMIN
# ==========================================
@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = (
        "home_team",
        "away_team",
        "match_date",
        "competition_type",
        "location",
        "is_completed",
        "result",
    )
    list_filter = ("competition_type", "is_completed")
    search_fields = ("home_team__name", "away_team__name", "location")
    autocomplete_fields = ("home_team", "away_team")



@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ("first_name", "surname", "date_of_birth", "gender", "country", "team", "get_age")
    search_fields = ("first_name", "surname", "email")
    list_filter = ("country", "state_of_origin", "team")

    def get_age(self, obj):
        return obj.get_age()
    get_age.short_description = "Age"



@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "country")
    list_filter = ("country",)
    search_fields = ("name",)



@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'message', 'created_at')
    search_fields = ('name', 'email')
    readonly_fields = ('created_at',)

@admin.register(MenPlayer)
class MenPlayerAdmin(admin.ModelAdmin):
    list_display = (
        'first_name', 'surname', 'position', 'shirt_number', 'team',
        'phone_number', 'email', 'country', 'calculated_age', 'goals',
        'assists', 'matches_played',
    )
    search_fields = ('first_name', 'surname', 'position', 'country', 'state_of_origin' )
    list_filter = ('team', 'position', 'country', 'state_of_origin')
    ordering = ('surname',)
    fieldsets = (
        ('Personal Information', {
            'fields':(
                'first_name', 'surname', 'date_of_birth', 'position',  'shirt_number', 'team',
                'profile_picture', 'bio', 'address', 'state_of_origin',
                'country')
        }),

        ('Statistics', {
            'fields':('goals', 'assists', 'matches_played')
        }),

        ('Guardian Details', {
        'fields': 
            ('guardian_name', 'guardian_contact_number', 'guardian_email', 'guardian_address')
        })
    )


@admin.register(WomenPlayer)
class WomenPlayerAdmin(admin.ModelAdmin):
    list_display = (
        'first_name', 'surname', 'date_of_birth', 'position',  'shirt_number','team',
        'phone_number', 'email', 'country', 'calculated_age', 'goals',
        'assists', 'matches_played'
    )
    search_fields = ('first_name', 'surname', 'position', 'team__name', 'country', 'state_of_origin' )
    list_filter = ('team', 'position', 'country', 'state_of_origin')
    ordering = ('surname',)
    fieldsets = (
        ('Personal Information', {
            'fields':(
                'first_name', 'surname', 'date_of_birth', 'position', 'shirt_number',
                'profile_picture', 'bio', 'address', 'state_of_origin',
                'country', 
            ),
        }),
        ('Statistics', {
            'fields':('goals', 'assists', 'matches_played')
        }),
        ('Guardian Detais', {
        'fields': 
            ('guardian_name', 'guardian_contact_number', 'guardian_email', 'guardian_address')
        }),
    )


@admin.register(JuniorPlayer)
class JuniorPlayerAdmin(admin.ModelAdmin):
    list_display = (
        'first_name', 'surname', 'position',  'shirt_number', 'team', 'calculated_age',
        'goals', 'assists', 'matches_played', 'guardian_email', 'guardian_contact_number', 'country'
    )
    search_fields = ('first_name', 'surname', 'country', 'state_of_origin')
    list_filter = ('country', 'state_of_origin', 'position')
    ordering = ('surname',)
    fieldsets = (
        ('Personal Information', {
            'fields': (
                'first_name', 'surname', 'date_of_birth', 'position',  'shirt_number',
                'profile_picture', 'bio', 'address', 'state_of_origin', 'country'
            )
        }),
        ('Statistics', {
            'fields': ('goals', 'assists', 'matches_played')
        }),
        ('Guardian Details', {
            'fields': (
                'guardian_name', 'guardian_contact_number',
                'guardian_email', 'guardian_address'
            )
        }),
    )


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'published', 'created_at', 'updated_at')
    search_fields = ('title', 'content')
    list_filter = ('published', 'created_at')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'news', 'text', 'created_at', 'parent', 'like_count')
    search_fields = ('user__username', 'text')
    list_filter = ('created_at', 'news')
    ordering=('-created_at',)


# ---------- OrderItemInline (robust to unit_price/price naming) ----------
# Inline for order items
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1
    readonly_fields = ("subtotal",)
    fields = ("item", "quantity", "unit_price", "subtotal")

    class Media:
        js = ("kpfa/js/orderitem_inline.js",)

# ---------- ShopItem admin ----------
# Shop Item Admin
@admin.register(ShopItem)
class ShopItemAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "category", "date_added")  # removed 'stock' since model likely doesn't have it
    search_fields = ("name", "category")
    list_filter = ("category", "date_added")
    # Do not prepopulate name; if you add slug, then add prepopulated_fields for slug


# ---------- Order admin (with inline improvements) ----------
# Order Admin
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "total_amount_display",
        "is_paid",
        "status",
        "shipping_address",
        "created_at",
    )
    list_filter = ("is_paid", "status", "created_at")
    search_fields = ("user__username", "shipping_address")
    readonly_fields = ("created_at", "total_amount")
    inlines = [OrderItemInline]
    actions = ["mark_as_paid"]

    def mark_as_paid(self, request, queryset):
        updated = queryset.update(is_paid=True, status="Completed")
        self.message_user(request, f"{updated} order(s) marked as paid.")
    mark_as_paid.short_description = "Mark selected orders as paid"

    def total_amount_display(self, obj):
        return f"₦{obj.total_amount:,.2f}" if obj.total_amount else "₦0.00"
    total_amount_display.short_description = "Total Amount (₦)"


# ---------- Review admin ----------
# Review Admin
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'user_name', 'rating', 'short_text', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('user_name', 'product__name', 'text')
    readonly_fields = ('created_at',)

    def short_text(self, obj):
        """Show a short preview of the review text."""
        return (obj.text[:50] + '...') if obj.text else ''
    short_text.short_description = 'Review Text'


