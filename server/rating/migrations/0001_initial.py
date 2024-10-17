# Generated by Django 5.1.2 on 2024-10-13 09:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Rating",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("collectorID", models.IntegerField()),
                ("rating", models.IntegerField()),
                ("comment", models.TextField()),
                ("userID", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="Total_Rating",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("average_rating", models.FloatField(default=0.0)),
                ("ratings", models.ManyToManyField(to="rating.rating")),
            ],
        ),
    ]