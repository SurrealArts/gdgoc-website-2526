"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/app/utils/supabase/client";

interface UserContextType {
    user: any;
    profile: any;
    loading: boolean;
    isAdmin: boolean;   
}

const UserContext = createContext<UserContextType>({
    user: null,
    profile: null,
    loading: true,
    isAdmin: false,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);

      if (data.user) {
        const { data: profileData, error } = await supabase
          .from("Users")
          .select("first_name,last_name,is_admin")
          .eq("user_id", data.user.id)
          .single();
          if (error) {
              console.log("Error fetching profile:", error);
        }
        setProfile(profileData || null);
        setIsAdmin(profileData?.is_admin || false);
      }
      setLoading(false);
    };
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
            setUser(session.user);
        } else {
            setUser(null);
            setProfile(null);
            setIsAdmin(false);
        }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, profile, loading, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);