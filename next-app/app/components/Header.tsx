import Image from '@components.next-app/Image'
import Link from 'next/link'
import { Navigation } from '@components.next-app/Navigation'
import { load_Settings } from '@sanity.next-app/loader/loader'

const Header = async() => {
	const settings = await load_Settings()
	if (!settings) return;
	
	return (
		<div className="relative h-full flex flex-col items-center justify-center z-50 bg-primary-bg">
			<div className="relative main-padding">
				<div className='relative flex flex-row justify-between gap-4 my-4 items-center'>
					<Link href='/' aria-label='Link to the site home.' className='relative flex z-10 h-header-item flex-col items-center justify-center'>
						{ settings.logo ?
							<Image
								image={settings.logo}
								size={{ width: 200, height: 200, sizes: "(max-width: 244px) 50vw, (max-width: 244px) 50vw, 50vw" }}
								className='w-auto min-w-fit h-header-item'
							/>
							:
							<span className=''>
								{ settings.title }
							</span>
						}
					</Link>
					{ settings.navigation &&
						<Navigation navGroups={settings.navigation} className='flex-shrink' />
					}
				</div>
			</div>
		</div>
	)
}

export default Header