import { Button, ButtonGroup } from "@mui/material";
import React, { useEffect } from "react";

export function SelectFilterButton({ onFilterChange, filter }) {
    useEffect(() => {
        onFilterChange(filter);
    }, [filter, onFilterChange]);

    return (
        <ButtonGroup
            size="small"
            variant="contained"
            aria-label="Basic button group"
            sx={{
                "& .MuiButtonGroup-grouped": {
                    borderRight: "1px solid #ffffff",
                    "&:last-of-type": {
                        borderRight: "none",
                    },
                },
            }}
        >
            <Button
                sx={{
                    backgroundColor: "#FF4F5A",
                    "&:hover": { backgroundColor: "#e3444e" },
                }}
                onClick={() => onFilterChange("all")}
            >
                All
            </Button>
            <Button
                sx={{
                    backgroundColor: "#FF4F5A",
                    "&:hover": { backgroundColor: "#e3444e" },
                }}
                onClick={() => onFilterChange("active")}
            >
                Active
            </Button>
            <Button
                sx={{
                    backgroundColor: "#FF4F5A",
                    "&:hover": { backgroundColor: "#e3444e" },
                }}
                onClick={() => onFilterChange("completed")}
            >
                Completed
            </Button>
        </ButtonGroup>
    );
}