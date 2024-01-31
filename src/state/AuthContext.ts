import { User } from '@/types/User';
import { createContext } from 'react';


const AuthContext = createContext<{
    user: User | null,
    setUser: (user: User | null) => void
}>({
    user: null,
    setUser: () => {}
})

export default AuthContext;