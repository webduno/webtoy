import Logo from '@/dom/atom/logo/Logo'
import PublicTemplates from '../../dom/PublicTemplates'

export default function PublicPage() {
  return <div className=" h-100 w-100 flex-col">
      <Logo />
      <PublicTemplates />
    </div>
}
