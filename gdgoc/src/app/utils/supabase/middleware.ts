import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest){
    console.log("Middleware running for path:", req.nextUrl.pathname);
    
    const res = NextResponse.next();
    

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies:{
                get(name){
                    return req.cookies.get(name)?.value;
                },
                set() {},
                remove() {},
            },
        }
    );


    const {
        data: { session },
    } = await supabase.auth.getSession();

    if(!session){
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const { data: user } = await supabase
        .from("users")
        .select("isAdmin")
        .eq("id", session.user.id)
        .single();

    if(!user?.isAdmin){
        return NextResponse.redirect(new URL("/about-us", req.url));
    }
    return res;
}
export const config = {
    matcher: ["/admin/:path*"],
};