import { useEffect } from 'react';
import TextInput from '@/components/input/TextInput';
import SessionPage from '@/components/layout/SessionPage';
import { Form, Formik } from 'formik';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import routes from '@/constants/routes';

type FormValues = {
    team_name: string
}

export default function TeamEditPage() {

    // Hooks
    const auth = useAuth();
    const navigate = useNavigate();

    // Functions

    /**
     * Check if user already has a team and redirect them to dashboard if they do
     * this is for now because a user can only currently have a single team
     */
    const validateTeam = async () => {
        const team = await auth.fetchTeam();

        if(team) {
            navigate(routes.dashboard)
        }
    }

    // Handlers

    /**
     * On submit. Creates new team and redirects to dashboard
     * @param param0 
     */
    const handleSubmit = async ( { team_name }: FormValues) => {
        await auth.createTeam(team_name);

        navigate(routes.dashboard)
    }

    // This is temporary while it is possible to only have 1 team
    useEffect(() => {
        validateTeam();
    }, []);

    return (
        <SessionPage>
            <section>
                <h2>Create team</h2>
                <Formik<FormValues>
                    initialValues={{
                        team_name: ""
                    }}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <TextInput
                            label="Team name"
                            name="team_name"
                        />
                        <button type='submit'>Create team</button>
                    </Form>
                </Formik>
                
            </section>
        </SessionPage>
    )
}