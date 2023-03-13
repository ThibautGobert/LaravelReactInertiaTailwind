export const $can = (permissionName, auth)=> {
    return auth && auth.user && auth.user.short_permissions.find(sp=> sp.name === permissionName)
}
