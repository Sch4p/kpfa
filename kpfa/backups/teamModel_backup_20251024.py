class Team(models.Model):
    name = models.CharField(max_length=100)
    age_group = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} ({self.age_group})"