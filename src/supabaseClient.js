import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pguvvelnfpkyeojgrbht.supabase.co'
const supabaseKey = 'sb_publishable_3uiPhmDizPjl-uRg7IRhCA_8oYQiWMx'

export const supabase = createClient(supabaseUrl, supabaseKey)