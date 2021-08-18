import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      label: {
        textTransform: 'none',
      },
    },
    // MuiSvgIcon: {
    //   root: {
    //     width: '24rem',
    //     height: '24rem',
    //   },
    // },
  },
})
