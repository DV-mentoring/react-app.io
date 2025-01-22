import { Button, ButtonGroup } from '@mui/material'
import React, { useEffect } from 'react'

interface ISelectFilterButtonProps {
    onFilterChange: (filter: 'all' | 'active' | 'completed') => void
    filter: 'all' | 'active' | 'completed'
}

export function SelectFilterButton({
    onFilterChange,
    filter,
}: ISelectFilterButtonProps) {
    useEffect(() => {
        onFilterChange(filter)
    }, [filter, onFilterChange])

    return (
        <ButtonGroup
            size="small"
            variant="contained"
            aria-label="Basic button group"
            className="button-group"
        >
            <Button
                className="button-filter"
                onClick={() => onFilterChange('all')}
            >
                All
            </Button>
            <Button
                className="button-filter"
                onClick={() => onFilterChange('active')}
            >
                Active
            </Button>
            <Button
                className="button-filter"
                onClick={() => onFilterChange('completed')}
            >
                Completed
            </Button>
        </ButtonGroup>
    )
}
