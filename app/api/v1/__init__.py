from app.api.v1 import analysis, auth, hello, labs, note, profile

api_router = [auth.router, labs.router, profile.router, analysis.router, note.router, hello.router]

hello_router = hello.router
auth_router = auth.router
labs_router = labs.router
profile_router = profile.router
analysis_router = analysis.router
note_router = note.router
