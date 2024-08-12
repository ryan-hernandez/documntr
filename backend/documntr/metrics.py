class Metrics:
    """A class to track metrics related to generation times and tokens."""

    def __init__(self):
        """Initializes the metrics with default values."""
        self.total_time = 0
        self.num_generations = 0
        self.total_tokens = 0
        self.current_generation_time = 0

    """Updates the metrics with the given generation time and tokens.

    Parameters:
    generation_time (float): The time taken for the current generation.
    tokens (int): The number of tokens generated in the current generation.
    """
    def update(self, generation_time, tokens):
        self.current_generation_time = generation_time
        self.total_time += self.current_generation_time
        self.num_generations += 1
        self.total_tokens = tokens

    """Calculates the average time per generation.

    Returns:
    float: The average time per generation, or 0 if no generations have been recorded.
    """
    def get_average_time(self):
        return self.total_time / self.num_generations if self.num_generations > 0 else 0

    """Calculates the ratio of total tokens to the current generation time.

    Returns:
    float: The ratio of total tokens to the current generation time, or 0 if the current generation time is 0.
    """
    def get_token_time_ratio(self):
        return self.total_tokens / self.current_generation_time if self.current_generation_time > 0 else 0