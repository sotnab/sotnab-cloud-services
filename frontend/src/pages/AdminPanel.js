import { useEffect, useState } from 'react'
import useAuthContext from '../hooks/useAuthContext'

const settingNames = {
    'allowSignup': 'Allow signup for new users'
}

const AdminPanel = () => {
    const { user } = useAuthContext()
    const [settings, setSettings] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('/api/setting', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })

                const json = await response.json()

                setSettings(json.settings)

            } catch (error) {
                console.log(error)
            }
        }

        fetchSettings()
    }, [])

    const handleSettingChange = async (setting) => {
        if(loading) {
            return
        }

        setLoading(true)

        const response = await fetch(`/api/setting/${setting.name}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ booleanValue: !setting.booleanValue })
        })

        const { setting: updatedSetting } = await response.json()

        if (response.ok) {
            setSettings((value) => {
                return value.map((item) => {
                    if (item.name === setting.name) {
                        return updatedSetting
                    }
                    return item
                })
            })
        }

        setLoading(false)
    }

    return (
        <div className="admin">
            <h2 className="admin__title">Administrator panel</h2>

            <div className="admin__settings">
                <h3 className="admin__subtitle">Settings</h3>

                {settings.map((item) => (
                    <div className="admin__setting" key={item.name}>
                        <label className="admin__label" htmlFor={item.name}>
                            {settingNames[item.name]}
                        </label>
                        <input
                            type="checkbox"
                            className="admin__checkbox"
                            id={item.name}
                            disabled={loading}
                            onChange={() => handleSettingChange(item)}
                            checked={item.booleanValue}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminPanel