# Generated by Django 3.0.5 on 2020-04-05 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0014_auto_20200321_1024'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='photo',
            field=models.ImageField(default='photos/default.jpg', upload_to='photos', verbose_name='Фото работника'),
        ),
    ]
