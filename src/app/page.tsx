import { redirect } from 'next/navigation'

/** Landing page kini tinggal di /landingpage; root diarahkan ke sana. */
export default function RootPage() {
  redirect('/landingpage')
}
