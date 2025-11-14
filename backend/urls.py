"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
#from django.contrib import admin
#from django.urls import path, include
#from rest_framework.routers import DefaultRouter
#from kpfa.views import MatchViewSet, ContactCreateView, CandidateViewSet, MenPlayerViewSet
#from kpfa.views import  NewsViewSet, CommentListCreateView
#from kpfa.views import CountryViewSet, StateViewSet, WomenPlayerViewSet, JuniorPlayerViewSet, RegisterView
#from django.conf import settings
#from django.conf.urls.static import static
#from kpfa.views import LoginView, ReplyCreateView, toggle_like
#from kpfa.views import ShopItemViewSet, ReviewViewSet, OrderViewSet, TeamViewSet, KPFA_TeamListView
#from rest_framework.decorators import api_view, permission_classes
#from rest_framework import routers
#from payments.views import CandidatePaymentViewSet



#router = DefaultRouter()

#Routes for KPFA
#router.register("teams", TeamViewSet)
#router.register("men-players", MenPlayerViewSet, basename='men-players')
#router.register("women-players", WomenPlayerViewSet, basename='women-players')
#router.register("junior-players", JuniorPlayerViewSet, basename='junior-players')
#router.register("coaches", CoachViewSet)
#router.register("matches", MatchViewSet)
#router.register("news", NewsViewSet, basename="news")
#router.register("candidates", CandidateViewSet, basename="candidates")
#router.register("countries", CountryViewSet, basename="countries")
#router.register("states", StateViewSet, basename="states")
#router.register("shop", ShopItemViewSet, basename="products")
#router.register("reviews", ReviewViewSet, basename="reviews")
#router.register(r"orders", OrderViewSet, basename="orders")


# Routes for payments 
#router.register(r"candidate-payments", CandidatePaymentViewSet, basename="candidate-payment")



#urlpatterns = [
    
    #path('admin/', admin.site.urls),
    #path("api/", include(router.urls)),

    # paths for KPFA
    #path("api/register/", RegisterView.as_view(), name="register"),
    #path("api/login/", LoginView.as_view(), name="login"),
    #path("api/news/<int:news_id>/comments/", CommentListCreateView.as_view(), name="comments"),
    #path("comments/<int:comment_id>/like/", toggle_like, name="toggle-like"),
    #path("api/comments/<int:comment_id>/reply/", ReplyCreateView.as_view(), name="reply-comment"),
    #path("api/translate/", TranslateView.as_view(), name="translate"),
    #path("api/contact/", ContactCreateView.as_view(), name="contact"),
    #path("kpfa-teams/", KPFA_TeamListView.as_view(), name="kpfa-teams"),


    # paths for payments 
    #path("api/payments/", include("payments.urls")),

   
#]

#if settings.DEBUG:
    #urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from kpfa.views import (
    MatchViewSet, ContactCreateView, MenPlayerViewSet,
    NewsViewSet, CommentListCreateView, CandidateViewSet, CountryViewSet, StateViewSet,
    WomenPlayerViewSet, JuniorPlayerViewSet, RegisterView, LoginView,
    ReplyCreateView, toggle_like, ShopItemViewSet, ReviewViewSet, OrderViewSet,
    TeamViewSet, KPFA_TeamListView, CountryViewSet, StateViewSet, TranslateView, 
)

from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()

# KPFA routes
router.register("teams", TeamViewSet)
router.register("men-players", MenPlayerViewSet, basename='men-players')
router.register("women-players", WomenPlayerViewSet, basename='women-players')
router.register("junior-players", JuniorPlayerViewSet, basename='junior-players')
router.register("matches", MatchViewSet)
router.register("news", NewsViewSet, basename="news")
router.register("candidates", CandidateViewSet, basename="candidates")
router.register("countries", CountryViewSet, basename="countries")
router.register("states", StateViewSet, basename="states")
router.register("shop", ShopItemViewSet, basename="products")
router.register("reviews", ReviewViewSet, basename="reviews")
router.register("orders", OrderViewSet, basename="orders")


news_list = NewsViewSet.as_view({"get": "list"})
news_translated = NewsViewSet.as_view({"get": "translated"})




urlpatterns = [

   
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    #path("api/translate/", include("translation.urls")),

        # install payment routes
    path("api/payments/", include("payments.urls")),

    # KPFA paths
    path("api/register/", RegisterView.as_view(), name="register"),
    path("api/login/", LoginView.as_view(), name="login"),
    path("api/news/<int:news_id>/comments/", CommentListCreateView.as_view(), name="comments"),
    path("comments/<int:comment_id>/like/", toggle_like, name="toggle-like"),
    path("api/comments/<int:comment_id>/reply/", ReplyCreateView.as_view(), name="reply-comment"),
    path("api/contact/", ContactCreateView.as_view(), name="contact"),
    path("kpfa-teams/", KPFA_TeamListView.as_view(), name="kpfa-teams"),
    
    path("api/news/", news_list, name="news-list"),
    path("api/news/translated/", news_translated, name="news-translated"),
    path("api/translate/", TranslateView.as_view(), name="translate"),

  

  
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
