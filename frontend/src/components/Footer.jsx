import { Github, Linkedin } from "lucide-react"

const Footer = () => {
    const date = new Date().getFullYear();

  return (
        <footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'>
			<div className='flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
				<p className='flex text-center items-center leading-loose text-muted-foreground md:text-left gap-x-3'>
					<a
						href='https://github.com/dulee19'
						target='_blank'
						rel='noreferrer'
						className='font-medium'
					>
                        Github
					</a>
                    <Github />
				</p>

                <p>{date} | All Rights Reserved | &copy;</p>

                <p className="flex gap-x-3">Created by 
                    <a
						href='https://www.linkedin.com/in/dusan-aleksic-b22237211/'
						target='_blank'
						rel='noreferrer'
						className='font-medium underline underline-offset-4'
					>
                        <Linkedin />
					</a>
                </p>
			</div>
		</footer>
  )
}

export default Footer