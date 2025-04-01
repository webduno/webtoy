import Logo from '@/dom/atom/logo/Logo'
import PublicTemplates from '../../dom/PublicTemplates'
import { AboutPage } from '../../dom/AboutPage'

export default function PublicPage() {
  return <div className=" flex-col flex-align-start h-100vh w-100"
  style={{
    alignItems: 'start',
    justifyContent: 'start',
    alignSelf: 'start',
    justifySelf: 'start',
  }}>
      <Logo />
      <AboutPage />
    </div>
}


