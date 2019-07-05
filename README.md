# LabPipe Client

[![Build Status](https://travis-ci.com/colin-bz/labpipe-server-public.svg?branch=master)](https://travis-ci.com/colin-bz/labpipe-server-public)

Client to work with LabPipe Server to assist with data collection:

- **dynamic**: server-side form configuration
- **simple**: wizard style step-by-step guide through forms
- **standalone**: server connection only required at first use*

<sup>*</sup> Server connection is still required if you wish to use functions provided on the server, e.g. notification, backup, and other post upload processes.

## Build from source code

### Prerequisite

To build from source code, you will need to install the following components:

- Node.js (Tested with 12.4.0)
- Yarn (Tested with 1.16.0)

### Build and run

```
yarn install
yarn start
```

#### More documentations are being added

## Roadmap

- [ ] To support more dynamic form field types
- [ ] To support more form validation types
- [ ] To support dynamic form layout
- [ ] To support more built-in form processes
- [ ] To support conditional access to forms, e.g record form might require daily quality control form to be completed upfront
