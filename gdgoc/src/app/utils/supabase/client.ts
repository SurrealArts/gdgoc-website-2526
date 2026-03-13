
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const fallbackUrl = "https://example.supabase.co";
const fallbackKey = "public-anon-key";

if (!supabaseUrl || !supabaseKey) {
	console.warn(
		"Supabase env vars are missing. Using a fallback client; auth/data features will be unavailable until NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY are set."
	);
}

export const supabase = createClient(
	supabaseUrl || fallbackUrl,
	supabaseKey || fallbackKey
);