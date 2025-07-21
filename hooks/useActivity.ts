import { useState, useEffect } from 'react'

interface Activity {
  id: string
  type: string
  title: string
  description: string
  createdAt: string
  metadata?: any
}

export function useActivity(limit = 10) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`/api/activity?limit=${limit}`)
        if (response.ok) {
          const data = await response.json()
          setActivities(data)
        }
      } catch (error) {
        console.error('Error fetching activities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [limit])

  return { activities, loading }
}
