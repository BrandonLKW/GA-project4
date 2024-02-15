import { Dayjs } from "dayjs";
import "./MonthSpinner.css";
import { Button, Typography } from "@mui/material";

type MonthSpinnerProps = {
    viewDate: Dayjs;
    setViewDate: (date: Dayjs) => void;
}

export default function MonthSpinner({ viewDate, setViewDate } : MonthSpinnerProps) {
    const minusMonth = () => {
        setViewDate(viewDate.subtract(1, "month"));
    };

    const plusMonth = () => {
        setViewDate(viewDate.add(1, "month"));
    };

    return (
        <div className="spinnerBody">
            <Typography className="spinnerText" variant="h4">
                {viewDate.format("MMMM")}{" "}{viewDate.format("YYYY")}
            </Typography>
            <Button className="spinnerLeftBtn" onClick={minusMonth}>
                &lt;
            </Button>
            <Button className="spinnerRightBtn" onClick={plusMonth}>
                &gt;
            </Button>
        </div>
    );
}
