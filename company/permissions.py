from rest_framework import permissions
def is_group_member(request,groups):
    return request.user.groups.filter(name__in = groups).exists()

def  is_group_member_perm(groups):
    class IsGroupMember(permissions.BasePermission):
        def has_permission(self, request, view):
            return is_group_member(request, groups)
    return IsGroupMember
