import axios from "axios";

class Athentication {

    // ::::::::: User roles :::::::::
    // seller
    // buyer (optional)
    // organization
    // admin

    successfulLogin(user, authHead) {  //
        // this.setupAxiosInterceptors(authHead)
        sessionStorage.setItem('authenticatedUserEmail', user.email);
        sessionStorage.setItem('authenticatedUserName', user.name);
        sessionStorage.setItem('authenticatedUserContact', user.contact);
        sessionStorage.setItem('authenticatedUserRole', user.role);
        sessionStorage.setItem('authenticatedUserLocation', user.location);
    }

    logout() {
        // this.ejectAxiosInterceptor()
        sessionStorage.removeItem('authenticatedUserEmail');
        sessionStorage.removeItem('authenticatedUserName');
        sessionStorage.removeItem('authenticatedUserContact');
        sessionStorage.removeItem('authenticatedUserRole');
        sessionStorage.removeItem('authenticatedUserLocation');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUserEmail');
        if (user === null) return false;
        return true;
    }

    loggedUserId() {
        let id = sessionStorage.getItem('authenticatedUserEmail');
        if (id === null) return '';
        return id;
    }

    loggedUserName() {
        let name = sessionStorage.getItem('authenticatedUserName');
        if (name === null) return '';
        return name;
    }

    loggedUserContact() {
        let contact = sessionStorage.getItem('authenticatedUserContact');
        if (contact === null) return '';
        return contact;
    }

    loggedUserLocation() {
        let location = sessionStorage.getItem('authenticatedUserLocation');
        if (location === null) return '';
        return location;
    }

    loggedUserRole() {
        let role = sessionStorage.getItem('authenticatedUserRole');
        if (role != null) return role;
        return null;
    }

    loggedUserLocation() {
        let location = sessionStorage.getItem('authenticatedUserLocation');
        if (location != null) return location;
        return null;
    }

    loggedUserContact() {
        let contact = sessionStorage.getItem('authenticatedUserContact');
        if (contact != null) return contact;
        return null;
    }

    loggedAsSeller() {
        let role = this.loggedUserRole()
        if (role != null && role === 'seller') return true;
        return false;
    }

    loggedAsOrganization() {
        let role = this.loggedUserRole()
        if (role != null && role === 'organization') return true;
        return false;
    }

    loggedAsBuyer() {
        let role = this.loggedUserRole()
        if (role != null && role === 'buyer') return true;
        return false;
    }

    loggedAsAdmin() {
        let role = this.loggedUserRole()
        if (role != null && role === 'admin') return true;
        return false;
    }


    setupAxiosInterceptors(basicAuthHeader) {
        this.id = axios.interceptors.request.use(
            (config) => {
                config.headers.authorization = basicAuthHeader;
                console.log('setting interceptor id: ' + this.id)
                return config;
            }
        )
    }

    ejectAxiosInterceptor() {
        console.log('ejecting interceptor id: ' + this.id)
        axios.interceptors.request.eject(this.id)
        console.log('ejected interceptor id: ' + this.id)
    }

}

export default new Athentication();