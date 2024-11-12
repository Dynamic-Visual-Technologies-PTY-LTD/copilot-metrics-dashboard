import { ErrorPage } from "../common/error-page";
import { AcceptanceRate } from "./charts/acceptance-rate";
import { ActiveUsers } from "./charts/active-users";
import { Editor } from "./charts/editor";
import { Language } from "./charts/language";
import { Stats } from "./charts/stats";
import { TotalCodeLineSuggestionsAndAcceptances } from "./charts/total-code-line-suggestions-and-acceptances";
import { TotalSuggestionsAndAcceptances } from "./charts/total-suggestions-and-acceptances";
import { DataProvider } from "./dashboard-state";
import { TimeFrameToggle } from "./filter/time-frame-toggle";
import { Header } from "./header";
import {
  getCopilotMetrics,
  IFilter,
} from "./services/copilot-metrics-service";
import { getCopilotSeats, getCopilotSeatsAssignment } from "./services/copilot-seat-service";
import SeatAnalysis from "./tables/seat-analysis";

export interface IProps {
  searchParams: MetricsFilter;
}

export default async function Dashboard(props: IProps) {
  const allDataPromise = getCopilotMetrics(props.searchParams);
  const usagePromise = getCopilotSeats();
  const seatsPromise = getCopilotSeatsAssignment();
  const [allData, usage, seats] = await Promise.all([allDataPromise, usagePromise, seatsPromise]);

  if (allData.status !== "OK") {
    return <ErrorPage error={allData.errors[0].message} />;
  }

  if (seats.status !== "OK") {
    return <ErrorPage error={seats.errors[0].message} />;
  }

  if (seats.status !== "OK") {
    return <ErrorPage error={seats.errors[0].message} />;
  }

  return (
    <DataProvider
      copilotUsages={allData.response}
      seatManagement={usage.response}
      copilotSeats={seats.response}
    >
      <main className="flex flex-1 flex-col gap-4 md:gap-8 pb-8">
        <Header />

        <div className="mx-auto w-full max-w-6xl container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Stats />
            <div className="flex justify-end col-span-4">
              <TimeFrameToggle />
            </div>
            <AcceptanceRate />
            <TotalCodeLineSuggestionsAndAcceptances />
            <TotalSuggestionsAndAcceptances />
            <Language />
            <Editor />
            <ActiveUsers />
            <SeatAnalysis />
          </div>
        </div>
      </main>
    </DataProvider>
  );
}
