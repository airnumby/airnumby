import SideNavbar from '../components/SideNavbar'
import { useCharts } from '../contexts/OrganizationContext';


export default function BookkeepingDashboardPage() {
    const charts = useCharts();

    const accounts = Array.from(Object.keys(charts.accounts));

    return (
        <div className="d-flex h-100 text-light">
            <SideNavbar />
            <div className="flex-1 d-flex flex-column mh-100 overflow-auto ms-2" >
                {accounts.map(account =>
                    <div key={account}>{account} - {charts.accounts[account]?.name}</div>
                )}
            </div>
        </div>
    )
}
