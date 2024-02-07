class UserManager {

    team: number | null = null;

    constructor() {
        this.revalidate();
    }

    getTeam() {
        return this.team
    }

    revalidate() {

    }
}

const user = new UserManager();