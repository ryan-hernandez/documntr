import os


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY")
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")


class DevelopmentConfig(Config):
    DEBUG = True
    # Add any other development-specific configurations here


class ProductionConfig(Config):
    DEBUG = False
    # Add any production-specific configurations here


# You can add more environment configurations as needed

config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
