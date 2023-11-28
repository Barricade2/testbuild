from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from django.contrib.auth.forms import AuthenticationForm, UserCreationForm, PasswordResetForm
from django import forms
from django.contrib.auth.models import User




class LoginUserForm(AuthenticationForm):
    username = forms.CharField(label=False, widget=forms.TextInput(attrs={'class':'form-control', 'autocomplete': "username", 'placeholder': _("Логин"), 'style':"display: initial;"}))
    password = forms.CharField(label=False, widget=forms.PasswordInput(attrs={'class':'form-control', 'autocomplete': "current-password", 'placeholder': _("Пароль"), 'style':"display: initial;"}))
    remember_me = forms.BooleanField(required=False, initial=True)

class RegistrationUserForm(UserCreationForm):
    email = forms.EmailField(
        label=False,
        max_length=254,
        widget=forms.EmailInput(attrs={'class':'form-control', 'autocomplete': 'email', 'placeholder': _("Введите свой Email"), 'style':"display: initial;"})
    )
    username = forms.CharField(
        label=False,
        max_length=32,
        widget=forms.TextInput(attrs={'class':'form-control', 'placeholder': _("Придумайте логин"), 'style':"display: initial;"}),
        help_text="",)
    password1 = forms.CharField(
        label=False,
        max_length=32,
        min_length=6,
        widget=forms.PasswordInput(attrs={'class':'form-control', 'autocomplete': 'new-password', 'placeholder': _("Придумайте пароль"), 'style':"display: initial;"}),
        help_text="")
    password2 = forms.CharField(
        label=False,
        max_length=32,
        min_length=6,
        widget=forms.PasswordInput(attrs={'class':'form-control', 'autocomplete': 'new-password', 'placeholder': _("Подтвердите пароль"), 'style':"display: initial;"}),
        help_text="",
    )

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise ValidationError('Email Already Exists')

        return email

    class Meta:
        model = User
        fields = ['username', 'password1', 'password2', 'email']
        place_holder = {
            'username': "Логин",
            'password1': 'Пароль',
            'password2': 'Пароль',
            'email': 'Email',
        }

class MyPasswordResetForm(PasswordResetForm):
    email = forms.EmailField(
        label=False,
        max_length=254,
        widget=forms.EmailInput(
            attrs={'class': 'form-control', 'autocomplete': 'email', 'placeholder': _("Введите свой Email"),
                   'style': "display: initial;"})
    )




#Util, example: formset = RequireOneFormSet
"""Wad of Stuff Forms"""
from django import forms
from django.forms.models import BaseInlineFormSet, ModelForm

__all__ = ('RequireOneFormSet',)

class RequireOneFormSet(BaseInlineFormSet):
    """Require at least one form in the formset to be completed."""
    def clean(self):
        """Check that at least one form has been completed."""
        super(RequireOneFormSet, self).clean()
        for error in self.errors:
            if error:
                return
        completed = 0
        for cleaned_data in self.cleaned_data:
            # form has data and we aren't deleting it.
            if cleaned_data and not cleaned_data.get('DELETE', False):
                completed += 1

        if completed < 1:
            raise forms.ValidationError("At least one %s is required." %
                self.model._meta.object_name.lower())
