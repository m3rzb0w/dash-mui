import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'

interface CampaignType {
    id?: string
    title: string
    inputValue?: string
}

const filter = createFilterOptions<CampaignType>()

export default function FreeSoloCreateOption() {
    const [campaigns, setCampaigns] = useState<CampaignType[]>([])
    const [value, setValue] = useState<CampaignType | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:8000/campaigns")
            .then((res) => res.json())
            .then((data: CampaignType[]) => setCampaigns(data))
    }, [])

    const handleNewCampaign = async (newCampaign: CampaignType) => {

        const upperCaseTitle = newCampaign.title.toUpperCase()
        const existingCampaign = campaigns.some(campaign => campaign.title.toUpperCase() === upperCaseTitle)

        if (existingCampaign) {
            console.log('Campaign already exists!')
            return
        }

        try {
            const response = await fetch("http://localhost:8000/campaigns", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: upperCaseTitle }),
            })

            if (!response.ok) {
                throw new Error("Failed to add campaign")
            }

            setCampaigns((prev) => [...prev, { title: upperCaseTitle }])
            setValue({ title: upperCaseTitle })
        } catch (error) {
            console.error(error)
        }
    }

    const handleGoToCampaign = (campaignTitle: string) => {
        navigate(`/campaign/${campaignTitle}`)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Autocomplete
                value={value}
                onChange={(_, newValue) => {
                    if (typeof newValue === 'string') {
                        const newCampaign = { title: newValue }
                        handleNewCampaign(newCampaign)
                    } else if (newValue && newValue.inputValue) {
                        const newCampaign = { title: newValue.inputValue }
                        handleNewCampaign(newCampaign)
                    } else {
                        setValue(newValue)
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params)
                    const { inputValue } = params
                    const isExisting = options.some((option) => inputValue === option.title)

                    if (inputValue !== '' && !isExisting) {
                        filtered.push({
                            inputValue,
                            title: `Add "${inputValue}"`,
                        })
                    }
                    return filtered
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="campaign-select"
                options={campaigns}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option
                    }
                    if (option.inputValue) {
                        return option.inputValue
                    }
                    return option.title
                }}
                renderOption={(props, option) => {
                    const { key, ...restProps } = props
                    return <li key={key} {...restProps}>{option.title}</li>
                }}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label="Select / Add Campaign" />
                )}
            />

            <Button
                variant="contained"
                disabled={!value || !value.title}
                sx={{
                    marginTop: 2,
                    '&.Mui-disabled': {
                      backgroundColor: 'grey',
                      color: 'lightgrey',
                    },
                  }}
                onClick={() => value?.title && handleGoToCampaign(value.title)}
            >
                GO TO {value?.title || 'Campaign'}
            </Button>
        </Box>
    )
}
