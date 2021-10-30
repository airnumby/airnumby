import SideNavbar from '../components/SideNavbar'
import { useCharts } from '../contexts/OrganizationContext';


export default function BookkeepingDashboardPage() {
    const charts = useCharts();

    const accounts = Array.from(charts.accounts.keys());

    return (
        <div className="d-flex h-100">
            <SideNavbar />
            <div className="flex-1 d-flex flex-column mh-100 overflow-auto ms-2" >
                {accounts.map(account =>
                    <div key={account}>{account} - {charts.accounts.get(account)?.name}</div>
                )}
            </div>
        </div>
    )
}
