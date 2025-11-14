from django.db import models
from datetime import date
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.contrib.auth.models import User
from django.conf import settings
from django.contrib.auth import get_user_model


class Team(models.Model):
    name = models.CharField(max_length=100)
    age_group = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} ({self.age_group})"



# Example choices (you can expand later)
POSITIONS = [
    ("GK", "Goalkeeper"),
    ("RCB", "Right Center Back"), 
    ("LCB", "Left Center Back"),
    ("RWB", "Right Wing Back"),
    ("LWB", "Left Wing Back"),   
    ("AM", "Attacking Midfielder"),
    ("DM", "Defensive Midfielder"),
    ("RWF", "Right Wing Forward"),  
    ("LWF", "Left Wing Forward"), 
    ("STK", "Striker"),
]

COUNTRIES = [
    ("GH", "Ghana"),
    ("NG", "Nigeria"),
    ("CI", "Ivory Coast"),
    ("SN", "Senegal"),
    ("OTHER", "Other"),
]

COUNTRY_CODES = [
    ("+233", "🇬🇭 Ghana (+233)"),
    ("+234", "🇳🇬 Nigeria (+234)"),
    ("+225", "🇨🇮 Ivory Coast (+225)"),
    ("+221", "🇸🇳 Senegal (+221)"),
]



class Country(models.Model):
    code = models.CharField(max_length=3, unique=True)   # ISO code like 'NG', 'GH'
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class State(models.Model):
    country = models.ForeignKey(Country, related_name="states", on_delete=models.CASCADE)
    code = models.CharField(max_length=10)   # e.g. 'LA' for Lagos
    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ("country", "name")
        ordering = ["name"]

    def __str__(self):
        return f"{self.name}, {self.country.name}"

   

class Candidate(models.Model):
    first_name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    

    # Dropdowns
    position = models.CharField(max_length=5, choices=POSITIONS, blank=True, null=True)
    team = models.ForeignKey("Team", on_delete=models.SET_NULL, blank=True, null=True)
    state_of_origin = models.ForeignKey(State, on_delete=models.SET_NULL, null=True, blank=True)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True, blank=True)

    # Phone number with country code split
    phone_country_code = models.CharField(max_length=5, choices=COUNTRY_CODES, default="+233")
    phone_number = models.CharField(
        max_length=15,
        validators=[RegexValidator(r'^\d{5,15}$', "Enter a valid phone number.")]
    )

    email = models.EmailField(unique=True)
    address = models.TextField(max_length=300, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="candidate_profiles/", blank=True, null=True)

    # Guardian details
    guardian_name = models.CharField(max_length=200, blank=True, null=True)
    guardian_contact_code = models.CharField(max_length=5, choices=COUNTRY_CODES, default="+233", blank=True, null=True)
    guardian_contact_number = models.CharField(
        max_length=15,
        validators=[RegexValidator(r'^\d{5,15}$', "Enter a valid phone number.")],
        blank=True,
        null=True,
    )
    guardian_email = models.EmailField(blank=True, null=True)
    guardian_address = models.TextField(max_length=300, blank=True, null=True)
    applied_at = models.DateTimeField(auto_now_add=True)


    # Validation logic: if under 18 → guardian required
    def clean(self):
        from django.core.exceptions import ValidationError
        age = self.get_age()
        if age < 18:
            if not (self.guardian_name and self.guardian_contact_number and self.guardian_email):
                raise ValidationError("Guardian details are required for candidates under 18.")

    def get_age(self):
        today = date.today()
        return today.year - self.date_of_birth.year - (
            (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day)
        )
    
    class Meta:
        ordering = ["-applied_at"]

    def __str__(self):
        return f"{self.first_name} {self.surname}"


class MenPlayer(models.Model):
    first_name = models.CharField(max_length=100, null=False, blank=True)
    surname = models.CharField(max_length=100, null=False, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    position = models.CharField(max_length=50)
    shirt_number = models.CharField(max_length=5, null= True,blank=True)
    team = models.ForeignKey('Team', related_name='men_players', on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, blank=True, null=True)   
    email = models.EmailField(max_length=100, blank=True, null=True)
    address = models.TextField(max_length=300, blank=True, null=True)   
    state_of_origin = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="men_player_profiles/", blank=True, null=True)
    guardian_name = models.CharField(max_length=200, blank=True, null=True)    
    guardian_contact_number = models.CharField(max_length=15, blank=True, null=True)
    guardian_email = models.EmailField(max_length=100, blank=True, null=True)
    guardian_address = models.TextField(max_length=300, blank=True, null=True)

    matches_played = models.PositiveIntegerField(default=0)
    goals = models.PositiveIntegerField(default=0)
    assists = models.PositiveIntegerField(default=0)
    bio = models.TextField(blank=True, null=True)

    
    def __str__(self):
        return f"{self.first_name} {self.surname}"

    @property
    def calculated_age(self):
        if not self.date_of_birth:
            return None
        today = date.today()
        dob = self.date_of_birth
        return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))

    def clean(self):
        if self.date_of_birth:
            age = self.calculated_age
            if age < 5 or age > 21:
                raise ValidationError(f"Player's age must be between 5 and 21 years. Current age: {age}.")
            if self.date_of_birth > date.today():
                raise ValidationError("Player's date of birth cannot be in the future.")
        super().clean()




class WomenPlayer(models.Model):
    first_name = models.CharField(max_length=100, null=False, blank=True)
    surname = models.CharField(max_length=100, null=False, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    position = models.CharField(max_length=50)
    team = models.ForeignKey(Team, related_name='women_players', on_delete=models.CASCADE)
    shirt_number = models.CharField(max_length=5, null= True,blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    address = models.TextField(max_length=300, blank=True, null=True)
    state_of_origin = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="player_profiles/women/", blank=True, null=True)

    guardian_name = models.CharField(max_length=200, blank=True, null=True)    
    guardian_contact_number = models.CharField(max_length=15, blank=True, null=True)
    guardian_email = models.EmailField(max_length=100, blank=True, null=True)
    guardian_address = models.TextField(max_length=300, blank=True, null=True)

    matches_played = models.PositiveIntegerField(default=0)
    goals = models.PositiveIntegerField(default=0)
    assists = models.PositiveIntegerField(default=0)
    bio = models.TextField(blank=True, null=True)


    def __str__(self):
        return f"{self.first_name} {self.surname}"
    

    @property
    def calculated_age(self):
        if not self.date_of_birth:
            return None
        today = date.today()
        dob = self.date_of_birth
        return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))

    def clean(self):
        if self.date_of_birth:
            age = self.calculated_age
            if age < 5 or age > 21:
                raise ValidationError(f"Player's age must be between 5 and 21 years. Current age: {age}.")
            if self.date_of_birth > date.today():
                raise ValidationError("Player's date of birth cannot be in the future.")
        super().clean()




class JuniorPlayer(models.Model):
    first_name = models.CharField(max_length=100, null=False, blank=True)
    surname = models.CharField(max_length=100, null=False, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    position = models.CharField(max_length=50)
    shirt_number = models.CharField(max_length=5, null= True,blank=True)
    team = models.ForeignKey(Team, related_name='junior_players', on_delete=models.CASCADE)

    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(max_length=300, blank=True, null=True)   
    state_of_origin = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)

    guardian_name = models.CharField(max_length=200, blank=True, null=True)
    guardian_contact_number = models.CharField(max_length=15, blank=True, null=True)
    guardian_email = models.EmailField(max_length=100, blank=True, null=True)
    guardian_address = models.TextField(max_length=300, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="player_profiles/junior/", blank=True, null=True)

    matches_played = models.PositiveIntegerField(default=0)
    goals = models.PositiveIntegerField(default=0)
    assists = models.PositiveIntegerField(default=0)
    bio = models.TextField(blank=True, null=True)


    def __str__(self):
        return f"{self.first_name} {self.surname}"
    

    @property
    def calculated_age(self):
        if not self.date_of_birth:
            return None
        today = date.today()
        dob = self.date_of_birth
        return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))

    def clean(self):
        if self.date_of_birth:
            age = self.calculated_age
            if age < 5 or age > 21:
                raise ValidationError(f"Player's age must be between 5 and 21 years. Current age: {age}.")
            if self.date_of_birth > date.today():
                raise ValidationError("Player's date of birth cannot be in the future.")
        super().clean()



class Coach(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    team = models.OneToOneField(Team, related_name='coach', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name




 

class News(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to="news_images/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=True)
 
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Comment(models.Model):
    """
    Comments left by authenticated/loggedIn users on News articles.
    - user: the User who posted the comment
    - news: related News article
    - content: the comment text
    - created_at: timestamp
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    news = models.ForeignKey(News, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE) 
    likes=models.ManyToManyField(User, related_name='liked_comments', blank=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return f" Comment by {self.user.username} on {self.news.title}"
    
    @property
    def like_count(self):
        return self.likes.count()


# Contact Form

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"



# eShop

class ShopItem(models.Model):
    CATEGORY_CHOICES = [
        ('Jersey', 'Jersey'),
        ('Boots', 'Boots'),
        ('Ball', 'Ball'),
        ('Training Gear', 'Training Gear'),
        ('Equipment', 'Equipment'),
        ('Accessory', 'Accessory'),
    ]

    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, blank=True)
    stock_quantity = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='shop_items/', blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.price})"



User = get_user_model()

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shipping_address = models.TextField()
    is_paid = models.BooleanField(default=False)
    status = models.CharField(max_length=50, default="Pending")
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def update_total(self):
        """Recalculate total without triggering recursion."""
        total = sum(item.subtotal for item in self.order_items.all())
        # use update() to avoid calling save() again
        Order.objects.filter(pk=self.pk).update(total_amount=total)

    def save(self, *args, **kwargs):
        """Regular save — doesn't call update_total() to prevent recursion."""
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order #{self.pk} by {self.user.username}"


# kpfa/models.py

class OrderItem(models.Model):
    order = models.ForeignKey('Order', related_name='order_items', on_delete=models.CASCADE)
    item = models.ForeignKey('ShopItem', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.item and (self.unit_price is None or self.unit_price == 0):
            self.unit_price = self.item.price
        super().save(*args, **kwargs)

    @property
    def subtotal(self):
        if self.unit_price and self.quantity:
            return self.unit_price * self.quantity
        return 0

    def __str__(self):
        return f"{self.item.name} x {self.quantity}"


class Review(models.Model):
    product = models.ForeignKey(ShopItem, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    user_name = models.CharField(max_length=150, blank=True, null=True)
    rating = models.PositiveSmallIntegerField(default=5)
    text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)