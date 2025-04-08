<div class="markdown prose w-full break-words dark:prose-invert dark">
  <h3 data-start="93" data-end="142" class="">📌 <strong data-start="100" data-end="140">SpendWise - Expense &amp; Budget Tracker</strong></h3>
  <p data-start="144" data-end="391" class="">SpendWise is a powerful expense and budget tracking web application that helps users manage their finances effectively. It features real-time transaction tracking, graphical expense insights, and seamless integration with a companion mobile app.</p>
  <hr data-start="393" data-end="396" class="" style="">
  <h2 data-start="398" data-end="418" class="">🚀 <strong data-start="404" data-end="416">Features</strong></h2>
  <p data-start="420" data-end="983" class="">✅ <strong data-start="422" data-end="445">User Authentication</strong> - Secure login &amp; signup using MongoDB<br data-start="483" data-end="486">
  ✅ <strong data-start="488" data-end="514">Transaction Management</strong> - Add, edit, delete, and categorize transactions<br data-start="563" data-end="566">
  ✅ <strong data-start="568" data-end="589">Dynamic Dashboard</strong> - Graphical representation of expenses using charts<br data-start="641" data-end="644">
  ✅ <strong data-start="646" data-end="665">Dark/Light Mode</strong> - Supports theme switching for better user experience<br data-start="719" data-end="722">
  ✅ <strong data-start="724" data-end="742">Real-time Sync</strong> - Fetches and updates data in real-time using Firebase Firestore<br data-start="807" data-end="810">
  ✅ <strong data-start="812" data-end="834">Mobile-friendly UI</strong> - Fully responsive and optimized for mobile &amp; desktop<br data-start="888" data-end="891">
  ✅ <strong data-start="893" data-end="917">Companion Mobile App</strong> - Reads SMS &amp; notifications to track transactions automatically</p>
  <hr data-start="985" data-end="988" class="">
  <h2 data-start="990" data-end="1012" class="">🛠 <strong data-start="996" data-end="1010">Tech Stack</strong></h2>
  <ul data-start="1014" data-end="1354">
  <li data-start="1014" data-end="1060" class="">
  <p data-start="1016" data-end="1060" class=""><strong data-start="1016" data-end="1028">Frontend</strong>: Next.js, React, Tailwind CSS</p>
  </li>
  <li data-start="1061" data-end="1106" class="">
  <p data-start="1063" data-end="1106" class=""><strong data-start="1063" data-end="1074">Backend</strong>: Express.js, Node.js, MongoDB</p>
  </li>
  <li data-start="1107" data-end="1150" class="">
  <p data-start="1109" data-end="1150" class=""><strong data-start="1109" data-end="1121">Database</strong>: MongoDB with Mongoose ORM</p>
  </li>
  <li data-start="1151" data-end="1202" class="">
  <p data-start="1153" data-end="1202" class=""><strong data-start="1153" data-end="1171">Authentication</strong>: Firebase Auth / Custom Auth</p>
  </li>
  <li data-start="1203" data-end="1266" class="">
  <p data-start="1205" data-end="1266" class=""><strong data-start="1205" data-end="1225">State Management</strong>: React Context API / Redux (if needed)</p>
  </li>
  <li data-start="1267" data-end="1311" class="">
  <p data-start="1269" data-end="1311" class=""><strong data-start="1269" data-end="1288">Charts &amp; Graphs</strong>: Chart.js / Recharts</p>
  </li>
  <li data-start="1312" data-end="1354" class="">
  <p data-start="1314" data-end="1354" class=""><strong data-start="1314" data-end="1325">Hosting</strong>: Vercel / Firebase Hosting</p>
  </li>
  </ul>
  <hr data-start="1356" data-end="1359" class="">
  <h2 data-start="1361" data-end="1393" class="">🔧 <strong data-start="1367" data-end="1391">Installation &amp; Setup</strong></h2>
  <p data-start="1395" data-end="1422" class="">1️⃣ Clone the repository:</p>
  <pre class="!overflow-visible" data-start="1423" data-end="1511"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute bottom-0 right-0 flex h-9 items-center pr-2"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"></span><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre language-bash"><span><span>git </span><span><span class="hljs-built_in">clone</span></span><span> https://github.com/yourusername/spendwise-web.git</span><span><span class="hljs-built_in">
cd</span></span><span> spendwise-web</span></span></code></div></div></pre>
  <p data-start="1513" data-end="1540" class="">2️⃣ Install dependencies:</p>
  <pre class="!overflow-visible" data-start="1541" data-end="1564"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute bottom-0 right-0 flex h-9 items-center pr-2"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"></span><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre language-bash"><span><span>npm install</span></span></code></div></div></pre>
  <p data-start="1566" data-end="1656" class="">3️⃣ Set up environment variables:<br data-start="1599" data-end="1602">
  Create a <code data-start="1611" data-end="1623">.env.local</code> file and add your credentials:</p>
  <pre class="!overflow-visible" data-start="1657" data-end="1752"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute bottom-0 right-0 flex h-9 items-center pr-2"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"></span><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre language-env"><span>NEXT_PUBLIC_API_URL=http://localhost:5000
MONGODB_URI=your_mongodb_connection_string</span></code></div></div></pre>
  <p data-start="1754" data-end="1787" class="">4️⃣ Run the development server:</p>
  <pre class="!overflow-visible" data-start="1788" data-end="1811"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute bottom-0 right-0 flex h-9 items-center pr-2"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"></span><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre language-bash"><span><span>npm run dev</span></span></code></div></div></pre>
  <p data-start="1812" data-end="1867" class="">Visit <strong data-start="1818" data-end="1845"><code data-start="1820" data-end="1843">http://localhost:3000</code></strong> in your browser. 🚀</p>
  <hr data-start="1869" data-end="1872" class="">
  <h2 data-start="1874" data-end="1897" class="">📷 <strong data-start="1880" data-end="1895">Screenshots</strong></h2>
  <p data-start="1899" data-end="1987" class=""><img alt="SpendWise Dashboard" data-start="1899" data-end="1949" src="https://your-image-url.com"><br data-start="1949" data-end="1952">
  <em data-start="1952" data-end="1985">(Add relevant screenshots here)</em></p>
  <hr data-start="1989" data-end="1992" class="">
  <h2 data-start="1994" data-end="2013" class="">📜 <strong data-start="2000" data-end="2011">License</strong></h2>
  <p data-start="2014" data-end="2067" class="">This project is licensed under the <strong data-start="2049" data-end="2064">MIT License</strong>.</p>
  <hr data-start="2069" data-end="2072" class="">
  <h2 data-start="2074" data-end="2098" class="">🤝 <strong data-start="2080" data-end="2096">Contributing</strong></h2>
  <p data-start="2099" data-end="2163" class="">Contributions are welcome! Feel free to submit a pull request.</p>
  <hr data-start="2165" data-end="2168" class="">
  <h3 data-start="2170" data-end="2194" class="">✨ <strong data-start="2176" data-end="2192">Developed By</strong></h3>
  <p data-start="2195" data-end="2241" class=""><a data-start="2195" data-end="2239" rel="noopener" target="_new" class="" href="https://github.com/shashwat12965512001">Shashwat Srivastava</a></p>
</div>
