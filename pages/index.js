import Link from 'next/link'
import { Grid, Card, Text, Code, useTheme } from '@geist-ui/core'
import { useRouter } from 'next/router'

import Layout from '../components/Layout'
import { useThemeProvider } from '../state/Theme'
import { getLocaleDirection } from '../helpers/RTL'
import { useAuth } from '../state/Auth'

import config from '../config/main.config'
import i18n from '../config/i18n.config'

export default function ({ auth }) {
    const theme = useTheme()
    const { locale = config.defaultLocale } = useRouter()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    setLocalAuthentication(auth)

    const folio = i18n['root']['index']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

    return (
        <Layout
            config={config}
            i18n={i18n}
            useThemeProvider={useThemeProvider}
            crownLarge={title}
            crownSmall={description}
            metaTitle={title}
            metaDescription={description}
        >
            <Grid.Container gap={1}>
                <Grid xs={24}>
                    <Card
                        width="100%"
                        style={{
                            backgroundColor: theme.palette.accents_1,
                        }}
                    >
                        <Text
                            type="secondary"
                            style={{
                                direction: getLocaleDirection(locale),
                            }}
                        >
                            {folio['content'][locale]}
                        </Text>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const { AJWT } = ctx.req.cookies

    return {
        props: { auth: AJWT ? true : false },
    }
}
