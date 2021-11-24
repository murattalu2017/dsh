import CustomerChartLine from 'components/CustomerChartLine';
import CustomerChartBar from 'components/CustomerChartBar';
import PromotionChartLine from 'components/PromotionChartLine';
import PromotionChartPie from 'components/PromotionChartPie';
import PageVisitsCard from 'components/PageVisitsCard';
import TrafficCard from 'components/TrafficCard';

export default function Dashboard() {
    return (
        <>
            <div className="bg-light-blue-500 px-3 md:px-8 h-10" />

			<div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <CustomerChartLine />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <CustomerChartBar />
                        </div>
                    </div>
                </div>
            </div>

			<div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <PromotionChartLine />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-2 mb-14">
                            <PromotionChartPie />
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <PageVisitsCard />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <TrafficCard />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
