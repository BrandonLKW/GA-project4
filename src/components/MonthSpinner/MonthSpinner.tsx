import "./MonthSpinner.css";
import { Button, Typography } from "@mui/material";

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
            <Typography className="spinnerText" variant="h4">
                {viewDate.toLocaleDateString("default", { month: "long" })}{" "}{viewDate.getFullYear()}
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
