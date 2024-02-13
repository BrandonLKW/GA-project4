import "./MonthSpinner.css";
import { Button } from "@mui/material";

type MonthSpinnerProps = {
    viewDate: Date;
    setViewDate: (date: Date) => void;
}

export default function MonthSpinner({ viewDate, setViewDate } : MonthSpinnerProps) {
    const minusMonth = () => {
        const newDate = new Date(
            viewDate.getFullYear(),
            viewDate.getMonth() - 1,
            viewDate.getDate()
        );
        setViewDate(newDate);
    };

    const plusMonth = () => {
        const newDate = new Date(
            viewDate.getFullYear(),
            viewDate.getMonth() + 1,
            viewDate.getDate()
        );
        setViewDate(newDate);
    };

    return (
        <div className="spinnerBody">
            <Button onClick={minusMonth}>
                &lt;
            </Button>
            <h1>
                {viewDate.toLocaleDateString("default", { month: "long" })}{" "}
                {viewDate.getFullYear()}
            </h1>
            <Button onClick={plusMonth}>
                &gt;
            </Button>
        </div>
    );
}
