# Generated by Django 3.0.3 on 2020-03-02 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0010_auto_20200302_1331'),
    ]

    operations = [
        migrations.AddField(
            model_name='income',
            name='salary',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='income',
            name='total',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
    ]
