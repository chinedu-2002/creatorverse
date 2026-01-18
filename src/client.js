import { createClient } from '@supabase/supabase-js';

const URL = 'https://rdfjouhqivmgfkjkvzyx.supabase.co';
const API_KEY = 'sb_publishable_SztyxS64Jjq4s-9IU9-QmQ_L-XCmslj';

export const supabase = createClient(URL, API_KEY);
