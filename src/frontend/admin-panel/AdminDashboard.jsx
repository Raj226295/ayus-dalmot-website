import { useMemo, useState } from 'react'
import './admin-dashboard.css'

const nav = [
  ['dashboard','Dashboard','grid'], ['products','Products','box',['All Products','Add Product','Categories','Inventory']],
  ['orders','Orders','cart',['All Orders','Pending','Processing','Shipped','Delivered','Cancelled','Returns']],
  ['customers','Customers','users'], ['categories','Categories','layers'], ['coupons','Coupons & Offers','tag'],
  ['payments','Payments','card'], ['analytics','Analytics & Reports','chart'],
  ['content','Website Content','image',['Homepage','Hero Banners','Promotional Banners','About Us','Testimonials','FAQ']],
  ['messages','Messages','mail'], ['reviews','Reviews & Ratings','star'], ['shipping','Shipping','truck'],
  ['settings','Settings','settings',['General Settings','Admin Profile','Admin Users','Roles & Permissions']], ['logout','Logout','logout']
]

const products = [
  ['Pure Desi Ghee 1L','Ghee','GHE-1L-01','₹499','542','/ayush/product-sattu.png'],
  ['A2 Cow Ghee 500ml','Ghee','A2G-500-02','₹529','438','/ayush/product-kursela-chanachur.png'],
  ['Ayush Sattu 1kg','Staples','SAT-1KG-03','₹180','405','/ayush/product-sattu.png'],
  ['Besan 1kg','Staples','BES-1KG-04','₹140','389','/ayush/product-mixture.png'],
  ['Puja Thali Set','Essentials','PUJ-SET-05','₹300','312','/ayush/product-paneer-bhujia.png'],
]
const orders = [
  ['#ORD1258','Rahul Sharma','RS','28 May 2025','₹1,299','Pending','COD'],
  ['#ORD1257','Priya Singh','PS','28 May 2025','₹2,499','Processing','Paid'],
  ['#ORD1256','Aman Verma','AV','27 May 2025','₹1,799','Shipped','Paid'],
  ['#ORD1255','Neha Gupta','NG','27 May 2025','₹3,249','Delivered','Paid'],
  ['#ORD1254','Vikas Kumar','VK','27 May 2025','₹999','Cancelled','Refunded'],
]

function Icon({name,size=20}) {
  const paths={
    grid:'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
    box:'m4 7 8-4 8 4v10l-8 4-8-4V7Zm0 0 8 4 8-4m-8 4v10', cart:'M3 4h2l2 11h10l2-7H6m3 11h.01M17 19h.01',
    users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    layers:'m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5', tag:'M20 13 13 20 4 11V4h7l9 9ZM8 8h.01',
    card:'M3 5h18v14H3zM3 10h18', chart:'M4 20V10m6 10V4m6 16v-7m5 7H2', image:'M3 4h18v16H3zM3 16l5-5 4 4 3-3 6 6M8 8h.01',
    mail:'M3 5h18v14H3zM3 7l9 7 9-7', star:'m12 2 3 6 7 .9-5 4.8 1.2 7-6.2-3.3L5.8 21 7 14 2 9l7-.9 3-6Z',
    truck:'M3 6h12v11H3zM15 10h4l3 3v4h-7M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
    settings:'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0-13v2m0 15v2m9.5-9.5h-2m-15 0h-2m16.2-6.2-1.4 1.4M6.7 17.3l-1.4 1.4m13.4 0-1.4-1.4M6.7 6.7 5.3 5.3',
    logout:'M10 4H4v16h6m4-4 4-4-4-4m4 4H9', menu:'M3 6h18M3 12h18M3 18h18', search:'M21 21l-4.5-4.5m2.5-5.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
    bell:'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4', chevron:'m9 6 6 6-6 6', plus:'M12 5v14M5 12h14', more:'M12 5h.01M12 12h.01M12 19h.01', calendar:'M4 5h16v16H4zM8 3v4m8-4v4M4 10h16', arrow:'M5 12h14m-5-5 5 5-5 5', close:'m6 6 12 12M18 6 6 18'
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]||paths.grid}/></svg>
}

function Sidebar({open,setOpen,page,setPage}) {
  const [expanded,setExpanded]=useState('')
  return <><div className={`backdrop ${open?'show':''}`} onClick={()=>setOpen(false)}/><aside className={`sidebar ${open?'open':''}`}>
    <div className="brand"><img src="/ayush/logo-navbar-clean.png"/><button onClick={()=>setOpen(false)}><Icon name="close"/></button></div>
    <nav>{nav.map(([id,label,icon,subs],i)=><div key={id}>
      {i===12&&<div className="nav-rule"/>}<button className={`nav-item ${page===id?'active':''}`} onClick={()=>{if(subs)setExpanded(expanded===id?'':id); else {setPage(id);setOpen(false)}}}>
        <Icon name={icon}/><span>{label}</span>{id==='messages'&&<b className="count">12</b>}{subs&&<i className={expanded===id?'up':''}><Icon name="chevron" size={15}/></i>}
      </button>{subs&&<div className={`submenu ${expanded===id?'open':''}`}>{subs.map(x=><button key={x} onClick={()=>{setPage(id);setOpen(false)}}>{x}</button>)}</div>}
    </div>)}</nav>
    <div className="side-art"><span>Pure traditions.<br/><b>Thoughtfully managed.</b></span></div>
  </aside></>
}

function Header({setOpen,page,setPage}){
  const [profile,setProfile]=useState(false),[notifications,setNotifications]=useState(false)
  return <header className="topbar"><div className="top-left"><button className="icon-btn" onClick={()=>setOpen(true)}><Icon name="menu"/></button><div className="crumb"><span>Admin</span><b>/</b><strong>{page[0].toUpperCase()+page.slice(1)}</strong></div></div>
    <div className="top-actions"><label className="search"><Icon name="search" size={17}/><input placeholder="Search anything..."/></label><button className="date-chip"><Icon name="calendar" size={17}/>21 May – 28 May <Icon name="chevron" size={13}/></button>
      <div className="pop-wrap"><button className="icon-btn notification" onClick={()=>setNotifications(!notifications)}><Icon name="bell"/><b>8</b></button>{notifications&&<div className="dropdown notifications"><strong>Notifications</strong><p>6 new orders received</p><p>3 products are low in stock</p><button>Mark all as read</button></div>}</div>
      <div className="pop-wrap"><button className="profile" onClick={()=>setProfile(!profile)}><span className="avatar">A</span><span><b>Admin</b><small>Super Admin</small></span><Icon name="chevron" size={14}/></button>{profile&&<div className="dropdown"><button onClick={()=>setPage('settings')}>Admin profile</button><button onClick={()=>setPage('settings')}>Settings</button><button className="danger">Logout</button></div>}</div>
    </div></header>
}

function StatCard({type,label,value,trend,tone}) {return <article className="stat-card"><div className={`stat-icon ${tone}`}><span>{type==='revenue'?'₹':type==='orders'?'▣':type==='customers'?'♟':type==='products'?'◆':'⌑'}</span></div><div className="stat-copy"><span>{label}</span><div><strong>{value}</strong><em className={tone==='alert'?'down':''}>↑ {trend}</em></div><small>vs last 7 days</small></div></article>}

function SalesChart(){return <div className="chart-wrap"><div className="y-labels"><span>₹2,00,000</span><span>₹1,50,000</span><span>₹1,00,000</span><span>₹50,000</span><span>₹0</span></div><svg className="sales-chart" viewBox="0 0 800 230" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#55a143" stopOpacity=".26"/><stop offset="1" stopColor="#55a143" stopOpacity="0"/></linearGradient></defs><g className="grid-lines"><path d="M0 10H800M0 60H800M0 110H800M0 160H800M0 210H800"/></g><path className="area" d="M0 168 C45 140 66 154 104 124 S170 110 205 100 S266 59 314 87 S383 133 426 130 S489 116 530 109 S581 92 616 37 S680 18 720 54 S766 89 800 79 L800 210L0 210Z"/><path className="line" d="M0 168 C45 140 66 154 104 124 S170 110 205 100 S266 59 314 87 S383 133 426 130 S489 116 530 109 S581 92 616 37 S680 18 720 54 S766 89 800 79"/><g className="dots">{[[0,168],[104,124],[205,100],[314,87],[426,130],[530,109],[616,37],[720,54],[800,79]].map((p,i)=><circle key={i} cx={p[0]} cy={p[1]} r="4"/>)}</g></svg><div className="x-labels">{['21 May','22 May','23 May','24 May','25 May','26 May','27 May','28 May'].map(x=><span key={x}>{x}</span>)}</div></div>}

function Donut({order=false}){return <div className="donut-box"><div className={`donut ${order?'order':''}`}>{order&&<span><b>1,248</b><small>Total Orders</small></span>}</div><div className="legend">{(order?[['Pending','28'],['Processing','156'],['Shipped','342'],['Delivered','679'],['Cancelled','43']]:[['Website','65%'],['Mobile App','20%'],['WhatsApp','10%'],['Others','5%']]).map((x,i)=><div key={x[0]}><i className={`c${i}`}/><span>{x[0]}</span><b>{x[1]}</b></div>)}</div></div>}

function Dashboard({toast}){
  return <><div className="welcome"><div><h1>Welcome back, Admin! <span>👋</span></h1><p>Here’s what’s happening with your store today.</p></div><select><option>Last 7 Days</option><option>Today</option><option>Last 30 Days</option><option>This Month</option></select></div>
    <section className="stats"><StatCard type="revenue" label="Total Revenue" value="₹12,45,678" trend="12.5%" tone="green"/><StatCard type="orders" label="Total Orders" value="1,248" trend="8.2%" tone="red"/><StatCard type="customers" label="Total Customers" value="3,652" trend="15.3%" tone="orange"/><StatCard type="products" label="Total Products" value="256" trend="5.6%" tone="green"/><StatCard type="pending" label="Pending Orders" value="28" trend="14.7%" tone="alert"/></section>
    <div className="dashboard-grid"><section className="card sales"><div className="card-head"><div><h2><Icon name="chart"/> Sales Overview</h2><div className="chart-key"><span className="rev">Revenue</span><span className="prev">Previous period</span></div></div><select><option>This Week</option><option>This Month</option><option>This Year</option></select></div><SalesChart/></section>
      <section className="card top-products"><div className="card-head"><h2>Top Selling Products</h2><button>View All</button></div><div className="mini-table head"><span>Product</span><span>Sold</span><span>Revenue</span></div>{products.map(p=><div className="mini-table" key={p[0]}><span className="product-name"><img src={p[5]}/><b>{p[0]}</b></span><span>{p[4]}</span><b>{['₹2,71,000','₹2,19,000','₹1,62,000','₹1,36,000','₹93,600'][products.indexOf(p)]}</b></div>)}</section>
      <section className="card recent-orders"><div className="card-head"><h2>Recent Orders</h2><button>View All Orders</button></div><div className="table-scroll"><table><thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th><th>Payment</th><th></th></tr></thead><tbody>{orders.map(o=><tr key={o[0]}><td><b>{o[0]}</b></td><td><span className="customer"><i>{o[2]}</i>{o[1]}</span></td><td>{o[3]}</td><td><b>{o[4]}</b></td><td><span className={`badge ${o[5].toLowerCase()}`}>{o[5]}</span></td><td><span className={`pay ${o[6].toLowerCase()}`}>{o[6]}</span></td><td><button className="more" onClick={()=>toast('Order actions opened')}><Icon name="more"/></button></td></tr>)}</tbody></table></div></section>
      <section className="card low-stock"><div className="card-head"><h2>Low Stock Products</h2><button>Manage Inventory</button></div>{[['A2 Cow Ghee 1L',8,10],['Besan 1kg',12,15],['Sattu 1kg',15,20],['Maida 1kg',7,12],['Suji 1kg',9,15]].map((p,i)=><div className="stock-row" key={p[0]}><span><img src={products[i%5][5]}/><b>{p[0]}</b></span><span>{p[1]} <small>/ {p[2]}</small></span><em>Low</em></div>)}</section>
      <section className="card donut-card"><div className="card-head"><h2>Sales by Channel</h2></div><Donut/></section><section className="card donut-card"><div className="card-head"><h2>Order Status Overview</h2></div><Donut order/></section>
      <section className="card recent-customers"><div className="card-head"><h2>Recent Customers</h2><button>View All</button></div>{orders.map((o,i)=><div className="customer-row" key={o[1]}><span className="customer"><i>{o[2]}</i><b>{o[1]}</b></span><span>{o[3]}</span><b>{[5,3,4,2,6][i]} orders</b></div>)}</section>
    </div></>}

function ProductsPage({toast}){const [search,setSearch]=useState(''); const visible=useMemo(()=>products.filter(p=>p[0].toLowerCase().includes(search.toLowerCase())),[search]); return <div className="page"><div className="page-title"><div><h1>Products</h1><p>Manage your product catalog and inventory.</p></div><button className="primary" onClick={()=>toast('Product editor is ready')}><Icon name="plus"/> Add Product</button></div><section className="card data-card"><div className="filters"><label className="search"><Icon name="search"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..."/></label><select><option>All Categories</option><option>Ghee</option><option>Staples</option></select><select><option>All Stock</option><option>In Stock</option><option>Low Stock</option></select><select><option>Active</option><option>Draft</option></select></div><div className="table-scroll"><table className="products-table"><thead><tr><th><input type="checkbox"/></th><th>Product</th><th>SKU</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>{visible.map(p=><tr key={p[0]}><td><input type="checkbox"/></td><td><span className="product-name"><img src={p[5]}/><b>{p[0]}</b></span></td><td>{p[2]}</td><td>{p[1]}</td><td><b>{p[3]}</b></td><td>{p[4]}</td><td><span className="badge delivered">Active</span></td><td><button className="more" onClick={()=>toast(`${p[0]} actions opened`)}><Icon name="more"/></button></td></tr>)}</tbody></table></div><div className="pagination"><span>Showing 1–{visible.length} of 256 products</span><div><button>‹</button><button className="active">1</button><button>2</button><button>3</button><button>›</button></div></div></section></div>}

function GenericPage({page,toast}){const labels={orders:'Orders',customers:'Customers',categories:'Categories',coupons:'Coupons & Offers',payments:'Payments',analytics:'Analytics & Reports',content:'Website Content',messages:'Messages',reviews:'Reviews & Ratings',shipping:'Shipping',settings:'Settings',logout:'Signed out'};return <div className="page"><div className="page-title"><div><h1>{labels[page]||'Admin'}</h1><p>Manage your {labels[page]?.toLowerCase()} from one clear workspace.</p></div><button className="primary" onClick={()=>toast('Changes saved successfully')}><Icon name="plus"/> Create New</button></div><section className="card placeholder"><div className="placeholder-icon"><Icon name={nav.find(n=>n[0]===page)?.[2]||'grid'} size={30}/></div><h2>{labels[page]} workspace</h2><p>This area is connected to the shared admin design system and ready for your store data.</p><button onClick={()=>toast('Changes saved successfully')}>Save changes</button></section></div>}

export default function App(){const [page,setPage]=useState('dashboard'),[open,setOpen]=useState(false),[message,setMessage]=useState('');function toast(x){setMessage(x);setTimeout(()=>setMessage(''),2600)}return <div className="admin-shell"><Sidebar open={open} setOpen={setOpen} page={page} setPage={setPage}/><div className="main-shell"><Header setOpen={setOpen} page={page} setPage={setPage}/><main>{page==='dashboard'?<Dashboard toast={toast}/>:page==='products'?<ProductsPage toast={toast}/>:<GenericPage page={page} toast={toast}/>}</main></div>{message&&<div className="toast"><span>✓</span>{message}</div>}</div>}
