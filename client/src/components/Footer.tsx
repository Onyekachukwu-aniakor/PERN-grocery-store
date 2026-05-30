import { BikeIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { footerData } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-green-900 text-white' >
        <div className="max-w-7xl mx-auto items-center py-5 px-5 sm:px-5 lg:px-6">
            {/* Top info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {/* Brand info */}
                <div className="">
                    <Link to='/' className='flex items-center gap-2 mb-2' >
                    <BikeIcon className='size-6 text-white'/>
                    <span className='font-medium text-[22px]'>{footerData.brand.name}</span></Link>

                    <p className='text-sm text-white/50 mb-2'>{footerData.brand.description}</p>
                <div className="flex gap-2  ">
                    {footerData.brand.socials.map((social, i)=>(
                        <a href={social.link} key={i} className='size-9 rounded-lg bg-white/30 flex-center  hover:bg-white/50'><social.icon  className='size-5'/></a>
                    ))}
                </div>
                </div>
                {/* Dynamic section */}
                {footerData.sections.map((section,i)=>(
                    <div className="" key={i}>
                        <h3 className='text-sm font-medium uppercase mb-2'>{section.title}</h3>
                        <ul className='space-y-2.5'>
                            {section.links.map((link,i)=>(
                                <li key={i}>
                                    {link.to? (
                                        <Link to={link.to} className='text-sm text-white/70 hover:text-white'>
                                        {link.label}</Link>
                                    ) : (
                                        <a href={link.href} className='text-sm text-white/70 hover:text-white'>{link.label}</a>
                                    )}
                                </li>

                            ))}

                        </ul>

                    </div>
                ))}

                {/* Contacts */}
                <div className="">
                    <h3 className='text-sm font-medium uppercase mb-2'>Contact Us</h3>
                    <ul className='space-y-3'>
                        
                            {footerData.contact.map((item,i)=>{
                                const Icon = item.icon;
                                return (
                                    <li key={i} className='flex text-sm gap-2 text-white/70'>
                                        <Icon className='size-5 text-white'/>{item.text}

                                    </li>
                                )
                            })}
                        

                    </ul>
                </div>
                

            </div>

            {/* Bottom info */}
            <div className="border-t border-white/10 mt-5 pt-3 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className='text-sm text-white/70'>{footerData.bottom.copyright}</p>
            <div className="flex gap-2">
                {footerData.bottom.links.map((link,i)=>(
                    <a href={link.href} key={i} 
                    className='text-sm text-white/50 hover:text-white/70'>{link.label}</a>
                ))}
            </div>

            </div>

        </div>

    </footer>
  )
}

export default Footer