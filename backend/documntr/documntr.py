from .code_analyzer import CodeAnalyzer
from .metrics import Metrics


class Documntr:
    """A documentation generator that analyzes code and suggests documentation based on best practices."""

    def __init__(self):
        """Initializes the Documntr with metrics for tracking performance."""
        self.metrics = Metrics()

    def analyze_code(self, code):
        """Analyzes the given code and returns documented code along with performance metrics.

        Args:
            code (str): The code to be analyzed.

        Returns:
            dict: A dictionary containing either an error message or the documented code with performance metrics.
        """
        result = CodeAnalyzer.analyze(code)

        if "error" in result:
            return result

        self.metrics.update(result["generation_time"], result["input_tokens"])

        return {
            "documented_code": result["documented_code"],
            "generation_time": self.metrics.current_generation_time,
            "average_time": self.metrics.get_average_time(),
            "total_tokens": self.metrics.total_tokens,
            "token_time_ratio": self.metrics.get_token_time_ratio(),
        }
