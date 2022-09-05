import useState from 'react-usestateref'
import essentials from '../../helpers/getEssentials'
import { Lock, Mail, LogIn, UserPlus } from '@geist-ui/icons'

import {
    Card,
    Divider,
    Collapse,
    Text,
    Button,
    Grid,
    useTheme,
    useToasts,
    Input,
} from '@geist-ui/core'

import {
    isLocaleRTL,
    loginHandler,
    registerHandler,
    getLocaleDirection,
    getGoogleURL,
    GoogleIcon,
    isEmail,
} from 'aryana'

export default function () {
    const {
        config,
        i18n,
        useThemeProvider,
        useAuth,
        useRouter,
        Link,
        Head,
        axios,
    } = essentials

    const theme = useTheme()
    const router = useRouter()
    const { locale = config['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()

    const { title, description } = i18n['pages']['login']

    const [email, setEmail, refEmail] = useState('')
    const [password, setPassword, refPassword] = useState('')
    const [confirmPassword, setConfirmPassword, refConfirmPassword] =
        useState('')
    const [loading, setLoading, refLoading] = useState(false)

    const {
        buttons,
        components: { header },
    } = i18n

    async function attemptLogin() {
        const response = await axios.post(
            config.backend.routes.login,
            {
                email: refEmail.current,
                password: refPassword.current,
            },
            config.backend.axios.simple
        )

        loginHandler({
            response,
            setLoading,
            setToast,
            setLocalAuthentication,
            router,
            toast: i18n['toasts']['login'][locale],
            redirect_uri: config.routes.user,
        })
    }

    async function attemptRegister() {
        const response = await axios.post(
            config.backend.routes.register,
            {
                email: refEmail.current,
                password: refPassword.current,
            },
            config.backend.axios.simple
        )

        registerHandler({
            response,
            setLoading,
            setToast,
            setLocalAuthentication,
            router,
            redirect_uri: config.routes.verify,
        })
    }

    return (
        <Grid.Container gap={1} className="avanti">
            <Grid xs={24} md={16}>
                <Card
                    width="100%"
                    style={{ backgroundColor: theme.palette.accents_1 }}
                >
                    <Collapse.Group>
                        <Collapse
                            title={header['modal']['login']['title'][locale]}
                            subtitle={
                                header['modal']['login']['subtitle'][locale]
                            }
                        >
                            <Input
                                label={
                                    !isLocaleRTL(locale) && <Mail size={16} />
                                }
                                labelRight={
                                    isLocaleRTL(locale) && <Mail size={16} />
                                }
                                placeholder={
                                    i18n['inputs']['email']['placeholder'][
                                        locale
                                    ]
                                }
                                width="100%"
                                value={email}
                                type={
                                    refEmail.current == ''
                                        ? 'default'
                                        : isEmail(refEmail.current)
                                        ? 'default'
                                        : 'error'
                                }
                                onChange={(e) => {
                                    setEmail(e.target.value.trim())
                                }}
                            />
                            <Input.Password
                                label={
                                    !isLocaleRTL(locale) && <Lock size={16} />
                                }
                                labelRight={
                                    isLocaleRTL(locale) && <Lock size={16} />
                                }
                                placeholder={
                                    i18n['inputs']['password']['placeholder'][
                                        locale
                                    ]
                                }
                                width="100%"
                                mt={1}
                                value={password}
                                type={
                                    refPassword.current == ''
                                        ? 'default'
                                        : refPassword.current.length > 7
                                        ? 'default'
                                        : 'error'
                                }
                                onChange={(e) => {
                                    setPassword(e.target.value.trim())
                                }}
                            />
                            <Button
                                loading={loading}
                                disabled={
                                    !refEmail.current ||
                                    !refPassword.current ||
                                    !isEmail(refEmail.current) ||
                                    refPassword.current.length < 8
                                }
                                width="100%"
                                mt={1}
                                type="secondary"
                                onClick={attemptLogin}
                                icon={<LogIn />}
                            >
                                {buttons['login'][locale]}
                            </Button>
                            <Link href="/auth/reset">
                                <a className="Peculiar">
                                    <Text
                                        style={{
                                            direction:
                                                getLocaleDirection(locale),
                                            textAlign: isLocaleRTL(locale)
                                                ? 'right'
                                                : 'left',
                                        }}
                                    >
                                        {buttons['forgot'][locale]}
                                    </Text>
                                </a>
                            </Link>
                        </Collapse>
                        <Collapse
                            id="Register"
                            style={{ borderBottom: 'none' }}
                            title={header['modal']['register']['title'][locale]}
                            subtitle={
                                header['modal']['register']['subtitle'][locale]
                            }
                        >
                            <Input
                                label={
                                    !isLocaleRTL(locale) && <Mail size={16} />
                                }
                                labelRight={
                                    isLocaleRTL(locale) && <Mail size={16} />
                                }
                                placeholder={
                                    i18n['inputs']['email']['placeholder'][
                                        locale
                                    ]
                                }
                                width="100%"
                                value={email}
                                type={
                                    refEmail.current == ''
                                        ? 'default'
                                        : isEmail(refEmail.current)
                                        ? 'success'
                                        : 'error'
                                }
                                onChange={(e) => {
                                    setEmail(e.target.value.trim())
                                }}
                            />
                            {!refEmail.current == '' &&
                                !isEmail(refEmail.current) && (
                                    <Text
                                        style={{
                                            direction:
                                                getLocaleDirection(locale),
                                        }}
                                        small
                                        type="error"
                                    >
                                        {
                                            i18n['inputs']['email']['error'][
                                                locale
                                            ]
                                        }
                                    </Text>
                                )}
                            <Input.Password
                                label={
                                    !isLocaleRTL(locale) && <Lock size={16} />
                                }
                                labelRight={
                                    isLocaleRTL(locale) && <Lock size={16} />
                                }
                                placeholder={
                                    i18n['inputs']['password']['placeholder'][
                                        locale
                                    ]
                                }
                                type={
                                    refPassword.current == ''
                                        ? 'default'
                                        : refPassword.current.length > 7
                                        ? 'success'
                                        : 'error'
                                }
                                width="100%"
                                mt={1}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value.trim())
                                }}
                            />
                            {!refPassword.current == '' &&
                                refPassword.current.length < 8 && (
                                    <Text small type="error">
                                        {
                                            i18n['inputs']['password']['error'][
                                                locale
                                            ]
                                        }
                                    </Text>
                                )}
                            <Input.Password
                                label={
                                    !isLocaleRTL(locale) && <Lock size={16} />
                                }
                                labelRight={
                                    isLocaleRTL(locale) && <Lock size={16} />
                                }
                                placeholder={
                                    i18n['inputs']['confirmPassword'][
                                        'placeholder'
                                    ][locale]
                                }
                                type={
                                    refConfirmPassword.current == ''
                                        ? 'default'
                                        : refConfirmPassword.current.length >
                                              7 &&
                                          refConfirmPassword.current ==
                                              refPassword.current
                                        ? 'success'
                                        : 'error'
                                }
                                width="100%"
                                mt={1}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value.trim())
                                }}
                            />
                            {!refConfirmPassword.current == '' &&
                                refConfirmPassword.current.length < 8 && (
                                    <Text small type="error">
                                        {
                                            i18n['inputs']['confirmPassword'][
                                                'error'
                                            ][locale]
                                        }{' '}
                                    </Text>
                                )}
                            {!refConfirmPassword.current == '' &&
                                refConfirmPassword.current !=
                                    refPassword.current && (
                                    <Text small type="error">
                                        {
                                            i18n['inputs']['password']['error'][
                                                locale
                                            ]
                                        }
                                    </Text>
                                )}
                            <Button
                                loading={loading}
                                disabled={
                                    !refEmail.current ||
                                    !refPassword.current ||
                                    refConfirmPassword.current !=
                                        refPassword.current ||
                                    !isEmail(refEmail.current) ||
                                    refPassword.current.length < 8 ||
                                    refConfirmPassword.current.length < 8
                                }
                                width="100%"
                                mt={1}
                                type="secondary"
                                onClick={attemptRegister}
                                icon={<UserPlus />}
                            >
                                {buttons['register'][locale]}
                            </Button>
                        </Collapse>
                    </Collapse.Group>
                    <Divider mt={1} mb={3}>
                        /
                    </Divider>
                    <a href={getGoogleURL()}>
                        <Button
                            icon={<GoogleIcon />}
                            type="secondary"
                            width="100%"
                            mt={0.8}
                            onClick={() => {}}
                        >
                            {buttons['google']['active'][locale]}
                        </Button>
                    </a>
                </Card>
            </Grid>
            <Grid xs={0} md={8}>
                <Card
                    width="100%"
                    style={{ backgroundColor: theme.palette.accents_1 }}
                ></Card>
            </Grid>
        </Grid.Container>
    )
}