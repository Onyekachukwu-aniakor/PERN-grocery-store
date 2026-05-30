import { ArrowUpRightIcon, BikeIcon, ChevronDownIcon,   MenuIcon, PackageIcon, SearchIcon,  ShoppingCartIcon, UserIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
//import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const user: any =  {name : 'Onyekachukwu Aniakor', email: 'carlosaniakorchukwu@gmail.com', isAdmin: true}  //null;
// const {user, logout} = useAuth()
   // backend integration above
    const {cartCount, setIsCartOpen} =useCart() //{cartCount : 5, setIsCartOpen : (_data : any)=> {}};

        const [searchQuery, setSearchQuery] = useState('');
        const [userMenuOpen, setUserMenuOpen] = useState(false);
        const navigate = useNavigate();


        const handleSearch = (e: React.SubmitEvent)=>{
            e.preventDefault();
            if(searchQuery.trim()){
                navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                setSearchQuery('');
            }

        };

        const handleLogout = ()=>{
            logout()
            setUserMenuOpen(false);
            navigate('/');
        }
  return (
    <nav className='sticky bg-white top-0 z-50 border-b border-app-border'>
        <div className="max-w-7xl mx-auto px-2 sm:px-5 lg:px-4 flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to='/' className='flex items-center gap-2 text-[22px] font-medium shrink-0'>
            <BikeIcon className='' size={26}/> Aniakor
            
            </Link>
            <div className="w-full flex items-center justify-end gap-4 lg:gap-8">
                {/* Navlinks Desktop only */}
                <div className="hidden md:flex items-center gap-5 text-sm text-zinc-600">
                    <Link to='/' className='' >Home</Link>
                    <Link to='/products' className='' >Products</Link>
                    <Link to='/deals' className='text-app-orange' >Deals</Link>
                    
                </div>
                {/* Search query */}
                <form className='hidden sm:flex flex-1 max-w-sm text-xs sm:text-sm'
                onSubmit={handleSearch}>
                    <div className="relative w-full"> <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-500'/>
                    <input type="text" 
                    className='w-full pl-10 p-2 bg-orange-100 rounded-full ring ring-app-orange/20 focus:ring-app-orange/30'
                    required
                    placeholder='Grocery search'
                    onChange={(e)=>setSearchQuery(e.target.value) } value={searchQuery}/>
                    </div>
                </form>
                {/* Right Actions  */}
                <div className="flex items-center gap-3">
                    {/* Cart */}
                    <button className='relative p-2 rounded-xl' onClick={()=>setIsCartOpen(true)}>
                    <ShoppingCartIcon className='size-6 text-zinc-900' />
                    {/* display total number of count in the cart */}


                    {cartCount > 0 && <span className='absolute -top-1 -right-1 size-5 bg-app-orange text-white text-[10px] rounded-full flex-center'>{cartCount}</span>}
                    </button>
                    {/* UserIcon */}
                    <div className="relative">
                        {user ? (
                            <button className='flex items-center gap-2 p-2'
                            onClick={()=>setUserMenuOpen(!userMenuOpen)}>
                                <div className="size-7 rounded-full bg-green-950 text-white flex-center">{user.name.charAt(0).toUpperCase()}</div>
                                <ChevronDownIcon className='size-6 text-zinc-500'/>
                            </button>
                            ) 
                            : (
                            <div className='flex-center gap-2'>
                                <Link to='/login' className='hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-green-950 rounded-full hover:bg-green-950-light transition-colors'><UserIcon className=''  size={17}/>Sign In</Link>
                                {userMenuOpen ? <XIcon className='md:hidden'
                                onClick={()=>setUserMenuOpen(!userMenuOpen)}/>
                                              : <MenuIcon className='md:hidden'
                                              onClick={()=>setUserMenuOpen(!userMenuOpen)}/> }
                                
                                </div>
                                )}

                          {userMenuOpen && (
                            <>
                            <div className="fixed inset-0 z-40 px-3 "  onClick={()=>setUserMenuOpen(false)}/>
                                {/* display all menu items */}
                                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50   animate-none">
                                    {user && (
                                        <div className="px-4 py-2 border-b border-app-border ">
                                            <p className='text-sm font-medium text-zinc-900 '>{user?.name}</p>
                                            <p className='text-sm text-zinc-500 '>{user?.email}</p>
                                        </div>
                                    )}
                                    <div className=""  onClick={()=>setUserMenuOpen(false)}>
                                        {!user && <Link className='dropdown-link' to='/login'><UserIcon size={17}/>Sign In</Link>}
                                        {user && <Link className="dropdown-link" to='/orders'><PackageIcon size={17}/>My Orders</Link>}
                                        {/* {user && <Link className='dropdown-link' to='/addresses'><MapPinIcon size={17}/>Addresses</Link>} */}

                                        <Link className='md:hidden dropdown-link' to='/products'><ArrowUpRightIcon size={17}/>Products</Link>
                                        <Link className='md:hidden dropdown-link' to='/deals'><ArrowUpRightIcon size={17}/>Deals</Link>
                                        {user?.isAdmin && (
                                          //'/admin/products' to be added in the link below  
                                            <Link className='dropdown-link' to=''>{/* <ShieldIcon className='text-app-orange-dark' size={17}/><span className='text-app-orange-dark'>Admin Panel</span> */}
                                            </Link>
                                        )}
                                        {user && (
                                            <div className="border-t border-app-border pt-1">
                                                {/* <button className='flex items-center gap-3 px-3  py-2 text-app-error hover:bg-red-50 w-full transition-colors' onClick={handleLogout}>
                                                    <LogOutIcon className=''  size={17}/>Logout
                                                </button> */}
                                            </div>
                                        ) }
                                    </div>
                                </div>
                            </>
                          )}
                    </div>

                </div>

            </div>
        </div>
    </nav>
  )
}

export default Navbar