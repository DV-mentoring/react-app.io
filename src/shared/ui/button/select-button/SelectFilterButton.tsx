import { Button, ButtonGroup } from '@mui/material'
import React, { useEffect } from 'react'
import { filterType } from '../../../../features/helpers/types'

interface ISelectFilterButtonProps {
    onFilterChange: (filter: filterType) => void
    filter: filterType
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
