from .code_analyzer import CodeAnalyzer


class Documntr:
    """A documentation generator that analyzes code and suggests documentation based on best practices."""

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

        return {
            "documented_code": result["documented_code"],
        }
