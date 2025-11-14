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

        ('Guardian Detais', {
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
        'first_name', 'surname', 'position',  'shirt_number','calculated_age',
        'goals', 'assists', 'matches_played', 'country'
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


@admin.register(Coach)
class CoachAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'team')
    search_fields = ('name', 'role', 'team__name')




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
    list_display = ("first_name", "surname", "date_of_birth", "country", "team", "get_age")
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