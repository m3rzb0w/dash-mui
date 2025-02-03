import { useParams } from "react-router"
import { useEffect, useState } from "react"
import NotFound from "./NotFoundPage"

export default function CampaignPage() {
  const { opcodeName } = useParams<{ opcodeName: string }>()
  const [campaign, setCampaign] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`http://localhost:8000/campaigns`)
        
        if (response.ok) {
          const data = await response.json()
          const matchedCampaign = data.find((campaign: { title: string }) => campaign.title === opcodeName)
          if (matchedCampaign) {
            setCampaign(matchedCampaign)
          } else {
            setCampaign(null)
          }
        } else {
          setCampaign(null)
        }
      } catch (error) {
        console.error("Error fetching campaign", error)
        setCampaign(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaign()
  }, [opcodeName])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!campaign) {
    return <NotFound />
  }

  return (
    <div>
      <h1>Campaign: {opcodeName}</h1>
      <p>Details of campaign: {campaign.id}</p>
    </div>
  )
}
