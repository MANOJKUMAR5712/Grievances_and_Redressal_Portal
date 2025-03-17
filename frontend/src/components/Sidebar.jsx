import { Lock, LogOut, Menu, Moon, Settings, Sun, UserPlus, Users2Icon } from "lucide-react";
import { useState , useEffect} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ensureAuthenticated } from "../store/auth.store";
import axios from "../axios.js";

const SIDEBAR_ITEMS = [
	{name: "Public",icon: Users2Icon,color: "#6366f1",href: "/"},
	{ name: "Private", icon: Lock, color: "#3B82F6", href: "/private" },
	{ name: "Create", icon: UserPlus, color: "#3B82F6", href: "/create" },
];



function Sidebar({ toggleColormode , colormode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [theme,setTheme] = useState(colormode);
	const {isAuthenticated,handleLogout} = ensureAuthenticated();
	const navigate = useNavigate();

	const Logout = async()=>{
		try{
			const res = await handleLogout();
			navigate('/login',{replace :true})
		}catch(error){
			console.log(error);
			navigate('/login',{replace :true})
		}
	}


	const handleTheme = ()=>{
		const theme = toggleColormode();
		setTheme(theme);
		console.log(theme);
	}

	return (
		<motion.div
			className={`relative z-10 transition-all duration-100 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className="h-full bg-gray-100 dark:bg-[#121826] bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-300 dark:border-gray-700">
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors max-w-fit"
				>
					<Menu size={24} />
				</motion.button>

				<nav className="mt-8 flex-grow">
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors mb-2">
								<motion.button 
									whileHover={{ scale: 1.1 }} 
									whileTap={{ scale: 0.9 }} 
								>
									<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								</motion.button>
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className="ml-4 whitespace-nowrap"
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.1, delay: 0.2 }}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={()=>handleTheme()}
						className="flex items-center p-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors mb-2"
					>
						{theme === 'dark' ? (<Sun size={20} style={{ color: "white", minWidth: "20px" }}/>) : (<Moon size={20} style={{ color: "black", minWidth: "20px" }}/>)}
					</motion.button>

					{isAuthenticated && <motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={()=>Logout()}
						className="flex items-center p-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors mb-2"
					>
						{theme === 'dark' ? (<LogOut size={20} style={{ color: "white", minWidth: "20px" }}/>) : (<LogOut size={20} style={{ color: "black", minWidth: "20px" }}/>)}
					</motion.button>
					}

				</nav>
			</div>
		</motion.div>
	);
}

export default Sidebar;
